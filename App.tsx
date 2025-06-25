import React, { useState } from 'react';
import { Calendar, BarChart3, Settings, Users, Utensils } from 'lucide-react';
import { TabButton } from './components/TabButton';
import { ReservationForm } from './components/ReservationForm';
import { ReservationList } from './components/ReservationList';
import { TableManagement } from './components/TableManagement';
import { Analytics } from './components/Analytics';
import type { Cliente, Mesa, Reserva } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'reservas' | 'mesas' | 'analytics'>('reservas');
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [mesas, setMesas] = useState<Mesa[]>([
    { numero: 1, capacidade: 2, ocupada: false, localizacao: 'Salão Principal', tipo: 'Romântica' },
    { numero: 2, capacidade: 4, ocupada: false, localizacao: 'Salão Principal', tipo: 'Regular' },
    { numero: 3, capacidade: 6, ocupada: false, localizacao: 'Terraço', tipo: 'Familiar' },
    { numero: 4, capacidade: 2, ocupada: false, localizacao: 'Área VIP', tipo: 'VIP' },
    { numero: 5, capacidade: 4, ocupada: false, localizacao: 'Jardim', tipo: 'Regular' },
    { numero: 6, capacidade: 8, ocupada: false, localizacao: 'Salão Principal', tipo: 'Familiar' },
    { numero: 7, capacidade: 2, ocupada: false, localizacao: 'Terraço', tipo: 'Romântica' },
    { numero: 8, capacidade: 4, ocupada: false, localizacao: 'Área VIP', tipo: 'VIP' },
    { numero: 9, capacidade: 6, ocupada: false, localizacao: 'Jardim', tipo: 'Regular' },
    { numero: 10, capacidade: 4, ocupada: false, localizacao: 'Salão Principal', tipo: 'Regular' },
  ]);

  const fazerReserva = (novaReserva: Omit<Reserva, 'id'>) => {
    const reservaComId: Reserva = {
      ...novaReserva,
      id: Date.now().toString()
    };

    setReservas([...reservas, reservaComId]);
    
    // Update table status
    setMesas(mesas.map(mesa => 
      mesa.numero === novaReserva.mesa.numero 
        ? { ...mesa, ocupada: true }
        : mesa
    ));
  };

  const cancelarReserva = (id: string) => {
    const reserva = reservas.find(r => r.id === id);
    if (reserva) {
      setReservas(reservas.filter(r => r.id !== id));
      
      // Free up the table
      setMesas(mesas.map(mesa => 
        mesa.numero === reserva.mesa.numero 
          ? { ...mesa, ocupada: false }
          : mesa
      ));
    }
  };

  const updateReservationStatus = (id: string, status: Reserva['status']) => {
    setReservas(reservas.map(reserva => 
      reserva.id === id ? { ...reserva, status } : reserva
    ));

    // If status is Finalizada or Cancelada, free up the table
    if (status === 'Finalizada' || status === 'Cancelada') {
      const reserva = reservas.find(r => r.id === id);
      if (reserva) {
        setMesas(mesas.map(mesa => 
          mesa.numero === reserva.mesa.numero 
            ? { ...mesa, ocupada: false }
            : mesa
        ));
      }
    }
  };

  const addTable = (novaMesa: Omit<Mesa, 'numero'>) => {
    const proximoNumero = Math.max(...mesas.map(m => m.numero)) + 1;
    const mesaComNumero: Mesa = {
      ...novaMesa,
      numero: proximoNumero,
      ocupada: false
    };
    setMesas([...mesas, mesaComNumero]);
  };

  const updateTable = (numero: number, dadosAtualizados: Partial<Mesa>) => {
    setMesas(mesas.map(mesa => 
      mesa.numero === numero ? { ...mesa, ...dadosAtualizados } : mesa
    ));
  };

  const deleteTable = (numero: number) => {
    const mesa = mesas.find(m => m.numero === numero);
    if (mesa && !mesa.ocupada) {
      setMesas(mesas.filter(m => m.numero !== numero));
    }
  };

  const reservasConfirmadas = reservas.filter(r => r.status === 'Confirmada').length;
  const mesasOcupadas = mesas.filter(m => m.ocupada).length;

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg">
                  <Utensils className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                    Sistema de Gestão Restaurante
                  </h1>
                  <p className="text-sm text-white/80">Plataforma completa de gerenciamento</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center space-x-2">
                <TabButton
                  icon={Calendar}
                  label="Reservas"
                  isActive={activeTab === 'reservas'}
                  onClick={() => setActiveTab('reservas')}
                  count={reservasConfirmadas}
                />
                <TabButton
                  icon={Settings}
                  label="Mesas"
                  isActive={activeTab === 'mesas'}
                  onClick={() => setActiveTab('mesas')}
                  count={mesasOcupadas}
                />
                <TabButton
                  icon={BarChart3}
                  label="Analytics"
                  isActive={activeTab === 'analytics'}
                  onClick={() => setActiveTab('analytics')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">Total de Reservas</p>
                  <p className="text-3xl font-bold text-white">{reservas.length}</p>
                </div>
                <div className="p-3 bg-blue-500/20 backdrop-blur-sm rounded-xl border border-blue-400/30">
                  <Calendar className="text-blue-300" size={24} />
                </div>
              </div>
            </div>
            
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">Mesas Ocupadas</p>
                  <p className="text-3xl font-bold text-white">{mesasOcupadas}</p>
                </div>
                <div className="p-3 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-400/30">
                  <Users className="text-red-300" size={24} />
                </div>
              </div>
            </div>
            
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">Mesas Disponíveis</p>
                  <p className="text-3xl font-bold text-white">{mesas.length - mesasOcupadas}</p>
                </div>
                <div className="p-3 bg-green-500/20 backdrop-blur-sm rounded-xl border border-green-400/30">
                  <Utensils className="text-green-300" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">Taxa de Ocupação</p>
                  <p className="text-3xl font-bold text-white">
                    {mesas.length > 0 ? Math.round((mesasOcupadas / mesas.length) * 100) : 0}%
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 backdrop-blur-sm rounded-xl border border-purple-400/30">
                  <BarChart3 className="text-purple-300" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'reservas' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ReservationForm onSubmit={fazerReserva} mesas={mesas} />
              <ReservationList 
                reservas={reservas} 
                onCancel={cancelarReserva}
                onUpdateStatus={updateReservationStatus}
              />
            </div>
          )}

          {activeTab === 'mesas' && (
            <TableManagement
              mesas={mesas}
              onAddTable={addTable}
              onUpdateTable={updateTable}
              onDeleteTable={deleteTable}
            />
          )}

          {activeTab === 'analytics' && (
            <Analytics reservas={reservas} mesas={mesas} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;