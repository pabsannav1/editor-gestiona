'use client';

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Función para traducir el texto según las reglas
  const translateText = (text: string): string => {
    // Reemplazar @PascalCase con el formato especificado
    const translatedText = text.replace(
      /@([A-Z][a-zA-Z]*)/g,
      (_, palabra) => `{{personalized | reference : ${palabra}}}` 
    );
    return translatedText;
  };

  // Efecto para actualizar la traducción cuando cambia el texto de entrada
  useEffect(() => {
    const translatedText = translateText(inputText);
    setOutputText(translatedText);
  }, [inputText]);

  // Función para copiar al portapapeles
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <div className={`h-screen bg-white ${inter.className} flex flex-col`}>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col p-4">
          <h2 className="text-2xl font-bold mb-2 text-black">Código Original</h2>
          <textarea
            className="flex-1 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-200 bg-white text-black"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe aquí tu código..."
          />
        </div>
        
        <div className="flex flex-col p-4 relative">
          <h2 className="text-2xl font-bold mb-2 text-black">Código Traducido</h2>
          <button
            onClick={copyToClipboard}
            className="absolute right-6 top-6 p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
            title="Copiar al portapapeles"
          >
            {copySuccess ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            )}
          </button>
          <textarea
            className="flex-1 p-4 border border-gray-200 rounded-lg font-mono text-sm resize-none bg-white text-black"
            value={outputText}
            readOnly
            placeholder="La traducción aparecerá aquí..."
          />
        </div>
      </div>
    </div>
  );
}
