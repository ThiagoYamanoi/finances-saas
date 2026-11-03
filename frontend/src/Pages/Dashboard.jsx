import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../Components/Form';
import Modal from '../Components/Modal';
import CategoryForm from '../Components/CategoryForm';
import BankConnect from '../Components/BankConnect';
import FinancialOverview from '../Components/FinancialOverview';
import TransactionCard from '../Components/TransactionCard';
import { getTransactions } from '../Services/TransactionApis';
import { getAccounts } from '../Services/AccountApis';
import { syncBankData } from '../Services/PluggyApis';
import { parseTransactionDate } from '../Utils/transactionUtils';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const refresh = useCallback(async () => {
    const [nextTransactions, nextAccounts] = await Promise.all([getTransactions(), getAccounts()]);
    setTransactions(nextTransactions);
    setAccounts(nextAccounts);
  }, []);

  useEffect(() => {
    let active = true;
    async function start() {
      try {
        try { await syncBankData(); }
        catch (err) { console.info('Sincronização bancária indisponível:', err.message); }
        if (active) await refresh();
      } catch (err) { if (active) setError(err.message || 'Erro ao carregar dados.'); }
      finally { if (active) setLoading(false); }
    }
    start();
    const interval = setInterval(() => refresh().catch(console.error), 30000);
    return () => { active = false; clearInterval(interval); };
  }, [refresh]);

  async function transactionCreated() {
    await refresh();
    setModal(null);
  }

  const recent = [...transactions].sort((a, b) => {
    const dateDiff = parseTransactionDate(b.data) - parseTransactionDate(a.data);
    return dateDiff || Number(b.id) - Number(a.id);
  }).slice(0, 5);

  const actionStyle = 'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition active:scale-[0.99]';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="bg-slate-900 px-5 py-8 text-white sm:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-5">
          <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Finance SaaS</p><h1 className="mt-1 text-3xl font-bold">Minhas finanças</h1><p className="mt-1 text-sm text-slate-300">Seu dinheiro, em um só lugar.</p></div>
          <BankConnect />
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl space-y-8 px-5 py-8 sm:px-8">
        <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div><p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">Movimentações</p><h2 className="mt-1 text-2xl font-bold text-slate-900">Transações recentes</h2><p className="mt-1 text-sm text-slate-500">Acompanhe e organize seus lançamentos.</p></div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setModal('transaction')} className={`${actionStyle} bg-emerald-600 text-white hover:bg-emerald-700`}>＋ Criar transação</button>
              <button onClick={() => setModal('category')} className={`${actionStyle} border border-slate-300 bg-white text-slate-800 hover:bg-slate-100`}>＋ Criar categoria</button>
            </div>
          </div>
          <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-4"><span className="text-sm text-slate-500">Últimos lançamentos</span><span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium">{transactions.length} transações</span></div>
          {error && <p role="alert" className="mb-4 text-sm text-red-600">{error}</p>}
          {loading ? <p className="py-10 text-center text-slate-500">Atualizando suas finanças...</p> : recent.length === 0 ? <p className="py-10 text-center text-slate-500">Nenhuma transação encontrada.</p> : <div className="space-y-3">{recent.map(t => <TransactionCard key={t.id} transaction={t} />)}</div>}
          <button onClick={() => navigate('/transactions', { state: { transactions } })} className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">Ver todas as transações →</button>
        </section>
        <FinancialOverview transactions={transactions} accounts={accounts} />
      </main>
      {modal === 'transaction' && <Modal title="Criar transação" onClose={() => setModal(null)}><Form onTransactionCreated={transactionCreated} /></Modal>}
      {modal === 'category' && <Modal title="Criar categoria" onClose={() => setModal(null)}><CategoryForm onCreated={() => setModal(null)} /></Modal>}
    </div>
  );
}
