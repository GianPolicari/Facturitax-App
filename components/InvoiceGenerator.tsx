"use strict";
"use client";

import React, { useState } from "react";
import { Printer, Download, RefreshCw } from "lucide-react";

// Types
interface InvoiceData {
    date: string;
    receiptNumber: string;
    payerName: string;
    amountNum: number;
    amountText: string;
    concept: string;
    signatureName: string;
}

const initialData: InvoiceData = {
    date: new Date().toISOString().split("T")[0],
    receiptNumber: "000163",
    payerName: "",
    amountNum: 0,
    amountText: "",
    concept: "",
    signatureName: "",
};

export default function InvoiceGenerator() {
    const [data, setData] = useState<InvoiceData>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: name === "amountNum" ? parseFloat(value) || 0 : value,
        }));
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-900">

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

                {/* LEFT COLUMN: EDITOR */}
                <div className="lg:col-span-4 flex flex-col gap-6 no-print">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            🧾 Facturitax <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded-full">Editor</span>
                        </h1>

                        <div className="space-y-5">
                            {/* Receipt Number & Date */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">N° Recibo</label>
                                    <input
                                        type="text"
                                        name="receiptNumber"
                                        value={data.receiptNumber}
                                        onChange={handleChange}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Fecha</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={data.date}
                                        onChange={handleChange}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm"
                                    />
                                </div>
                            </div>

                            {/* Payer Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Recibí de (Pagador)</label>
                                <input
                                    type="text"
                                    name="payerName"
                                    placeholder="Ej: Juan Pérez"
                                    value={data.payerName}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm"
                                />
                            </div>

                            {/* Money Text */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">La cantidad de (Texto)</label>
                                <input
                                    type="text"
                                    name="amountText"
                                    placeholder="Ej: Diez mil pesos con 00/100"
                                    value={data.amountText}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm"
                                />
                            </div>

                            {/* Amount Number */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Monto ($)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        name="amountNum"
                                        value={data.amountNum}
                                        onChange={handleChange}
                                        className="w-full pl-7 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm font-mono"
                                    />
                                </div>
                            </div>

                            {/* Concept */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">En concepto de</label>
                                <textarea
                                    name="concept"
                                    rows={3}
                                    placeholder="Ej: Alquiler mes..."
                                    value={data.concept}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition resize-none text-sm"
                                />
                            </div>

                            {/* Signature Name */}
                            <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                <label className="block text-sm font-semibold text-blue-900 mb-1">Firma Digital</label>
                                <input
                                    type="text"
                                    name="signatureName"
                                    placeholder="Nombre y Apellido"
                                    value={data.signatureName}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-blue-900 text-sm"
                                />
                                <p className="text-[10px] text-blue-600 mt-1.5 flex items-center gap-1">
                                    <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                    Se transformará en letra cursiva
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={handlePrint}
                            className="flex-1 bg-slate-900 text-white py-3.5 px-4 rounded-xl hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 font-medium shadow-md"
                        >
                            <Printer size={18} />
                            Imprimir
                        </button>
                        <button
                            onClick={() => setData(initialData)}
                            className="p-3.5 text-slate-600 bg-white hover:bg-slate-50 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all"
                            title="Resetear formulario"
                        >
                            <RefreshCw size={18} />
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN: PREVIEW */}
                <div className="lg:col-span-8 bg-gray-200/50 rounded-xl border border-dashed border-gray-300 p-8 flex items-start justify-center overflow-auto print:bg-white print:p-0 print:border-none print:w-full print:block print:overflow-visible">

                    {/* RECEIPT CONTAINER - This is what gets printed */}
                    <div className="receipt-print-area bg-white text-black shadow-2xl w-[850px] min-h-[500px] p-12 border border-gray-100 print:shadow-none print:border-none print:w-full relative mx-auto">

                        {/* Header X */}
                        <div className="flex justify-between items-start mb-10 relative border-b-2 border-black pb-6">
                            {/* Left Header */}
                            <div className="w-1/3 pt-2">
                                <div className="font-bold text-2xl tracking-widest mb-1">RECIBO</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Documento no válido como factura</div>
                            </div>

                            {/* Center X Box */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-14 h-14 bg-black text-white flex items-center justify-center text-3xl font-bold rounded shadow-sm">
                                X
                            </div>

                            {/* Right Header */}
                            <div className="w-1/3 text-right pt-2">
                                <div className="text-xl font-bold mb-2 text-slate-900">N° {data.receiptNumber || "000000"}</div>
                                <div className="text-sm text-gray-600">
                                    Fecha: <span className="font-bold text-black ml-1 border-b border-gray-300 pb-0.5">{data.date.split('-').reverse().join('/')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Body - CSS GRID LAYOUT */}
                        <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-8 text-lg items-baseline mb-12">

                            {/* Recibí de */}
                            <div className="text-right font-bold text-slate-800 whitespace-nowrap">Recibí de:</div>
                            <div className="border-b border-gray-300 pb-1 px-2 font-medium text-slate-900">
                                {data.payerName || "..................................................."}
                            </div>

                            {/* La cantidad de */}
                            <div className="text-right font-bold text-slate-800 whitespace-nowrap">La cantidad de pesos:</div>
                            <div className="border-b border-gray-300 pb-1 px-2 italic text-slate-700 bg-gray-50/50 print:bg-transparent">
                                {data.amountText || "..................................................."}
                            </div>

                            {/* Concepto */}
                            <div className="text-right font-bold text-slate-800 whitespace-nowrap self-start mt-2">En concepto de:</div>
                            <div className="p-3 border border-gray-200 rounded bg-gray-50 text-base leading-relaxed text-slate-700 min-h-[96px] print:bg-transparent print:border-gray-300">
                                {data.concept || "..."}
                            </div>

                        </div>

                        {/* Footer Row: Total & Signature */}
                        <div className="grid grid-cols-2 gap-12 items-end mt-auto pt-8">

                            {/* Total Section */}
                            <div className="flex flex-col items-start gap-2">
                                <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">Total</span>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-xl text-slate-800">Son: $</span>
                                    <div className="border border-gray-300 bg-gray-50 px-6 py-2 text-2xl font-bold text-slate-900 min-w-[180px] shadow-sm print:shadow-none print:border-black print:bg-transparent">
                                        {data.amountNum.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                                    </div>
                                </div>
                            </div>

                            {/* Signature Section */}
                            <div className="flex flex-col items-center justify-end relative h-32">
                                {/* Dynamic Signature */}
                                {data.signatureName && (
                                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full text-center text-4xl text-blue-900 font-signature transform -rotate-2 mix-blend-multiply z-10 print:text-black">
                                        {data.signatureName}
                                    </div>
                                )}

                                <div className="border-t border-slate-800 w-full pt-2 text-center z-0">
                                    <p className="text-xs uppercase font-bold tracking-widest text-slate-600">Firma y Aclaración</p>
                                </div>
                            </div>

                        </div>

                        {/* Branding */}
                        <div className="absolute bottom-3 left-12 text-[9px] text-gray-300 print:hidden font-mono">
                            Facturitax App
                        </div>

                    </div>

                    {/* Floating Print Hint */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-xs print:hidden bg-white/80 px-4 py-2 rounded-full shadow backdrop-blur-sm border border-gray-100 cursor-default hover:text-gray-600 transition">
                        Vista previa de impresión
                    </div>

                </div>
            </div>
        </div>
    );
}
