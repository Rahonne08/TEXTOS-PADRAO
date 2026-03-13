'use client';

import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Loader2, Sparkles, AlertCircle, Download, Key } from 'lucide-react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    if (typeof window !== 'undefined' && window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  const handleOpenKeySelector = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const generateImage = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [
            {
              text: prompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          },
        },
      });

      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {
        throw new Error('Nenhuma imagem foi gerada. Tente um prompt diferente.');
      }
    } catch (err: any) {
      console.error('Erro ao gerar imagem:', err);
      if (err.message?.includes("Requested entity was not found")) {
        setHasKey(false);
        setError("Chave de API expirada ou inválida. Por favor, selecione novamente.");
      } else {
        setError(err.message || 'Ocorreu um erro ao gerar a imagem.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (!hasKey) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-[#0f172a] rounded-3xl border border-slate-200 dark:border-blue-900/50 shadow-sm">
        <div className="w-16 h-16 bg-indigo-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-blue-400 mb-4">
          <Key className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Configuração Necessária</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6 max-w-xs">
          Para gerar imagens de alta qualidade, você precisa selecionar sua própria chave de API paga.
        </p>
        <button
          onClick={handleOpenKeySelector}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all flex items-center gap-2"
        >
          Selecionar Chave de API
        </button>
        <p className="mt-4 text-[10px] text-slate-400 dark:text-slate-500">
          Consulte <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="underline">documentação de faturamento</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-blue-900/50 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Gerador de Imagens IA</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Crie suportes visuais para seus atendimentos</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Descreva a imagem que deseja criar... (ex: Atendimento ao público em agência de energia)"
              className="w-full p-4 bg-slate-50 dark:bg-blue-900/20 border border-slate-200 dark:border-blue-900/50 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all min-h-[100px] resize-none dark:text-slate-200"
            />
          </div>

          <button
            onClick={generateImage}
            disabled={isGenerating || !prompt.trim()}
            className={cn(
              "w-full py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2",
              isGenerating || !prompt.trim()
                ? "bg-slate-100 dark:bg-blue-900/30 text-slate-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
            )}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Gerando Imagem...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Gerar Imagem
              </>
            )}
          </button>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/50 rounded-xl text-rose-600 dark:text-rose-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {generatedImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-blue-900/50 rounded-3xl p-4 shadow-xl overflow-hidden"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-blue-900/10 mb-4">
              <img
                src={generatedImage}
                alt="Imagem Gerada pela IA"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resultado da Geração</span>
              <a
                href={generatedImage}
                download="atendimento-energia-ia.png"
                className="p-2 bg-slate-100 dark:bg-blue-900/50 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white rounded-xl transition-all"
                title="Baixar Imagem"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
