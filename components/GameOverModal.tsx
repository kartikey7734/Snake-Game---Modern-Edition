import React, { useState, useEffect } from 'react';
import { CODE_LESSONS } from '../constants';
import { Card } from './PhoneControls';
import { CodeDetail } from '../types';

const DetailItem = ({ detail }: { detail: CodeDetail }) => {
    const categoryColors = {
        'Language': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        'Library': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
        'Framework': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
        'API': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        'Hook': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
        'Pattern': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        'File': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };

    const colorClass = categoryColors[detail.category] || categoryColors['File'];

    return (
        <div className="mb-3">
            <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2 py-1 rounded-md border ${colorClass}`}>{detail.category}</span>
                <h4 className="font-semibold text-light-text dark:text-dark-text">{detail.name}</h4>
            </div>
            <p className="mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary pl-4 border-l-2 border-light-border dark:border-dark-border ml-[10px]">
                {detail.description}
            </p>
        </div>
    );
};


const CodeAcademyView = () => {
    const totalXp = CODE_LESSONS.reduce((acc, lesson) => acc + lesson.xp, 0);
    const [expandedLesson, setExpandedLesson] = useState<string | null>(CODE_LESSONS[0].id);

    const toggleLesson = (id: string) => {
        setExpandedLesson(prevId => (prevId === id ? null : id));
    };
    
    useEffect(() => {
        if (window.lucide) {
            setTimeout(() => window.lucide.createIcons(), 50);
        }
    }, [expandedLesson]);

  return (
    <div className="p-4 md:p-8 animate-fadeIn">
        <Card>
            <div className="p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="flex items-center text-xl font-semibold text-light-text dark:text-dark-text">
                        <i data-lucide="code" className="mr-3"></i> SNAKE CODE ACADEMY
                    </h2>
                    <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 border border-yellow-400/50 rounded-full text-sm font-semibold">
                        {totalXp} XP EARNED
                    </span>
                 </div>
                 <p className="mb-6 text-light-text-secondary dark:text-dark-text-secondary">
                    A breakdown of the code and technologies used to build this game. Click on a lesson to learn more.
                 </p>
                 <div className="space-y-2">
                    {CODE_LESSONS.map(lesson => (
                        <div key={lesson.id} className="border border-light-border dark:border-dark-border rounded-lg overflow-hidden">
                           <button 
                                onClick={() => toggleLesson(lesson.id)}
                                className="w-full bg-light-surface dark:bg-dark-bg p-4 flex items-center justify-between text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-expanded={expandedLesson === lesson.id}
                           >
                                <div className="flex items-center">
                                    <div className={`p-2 rounded-full mr-4 ${expandedLesson === lesson.id ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                                        <i data-lucide="check-circle-2" className={`transition-colors ${expandedLesson === lesson.id ? 'text-green-500' : 'text-gray-500'}`}></i>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-light-text dark:text-dark-text">{lesson.title}</h3>
                                        <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full">{lesson.xp} XP</span>
                                    </div>
                                </div>
                                <i 
                                    data-lucide="chevron-down" 
                                    className={`w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary transition-transform duration-300 ${expandedLesson === lesson.id ? 'rotate-180' : ''}`}
                                ></i>
                           </button>
                           {expandedLesson === lesson.id && (
                               <div className="p-4 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border animate-fadeIn">
                                   <p className="italic text-light-text-secondary dark:text-dark-text-secondary mb-4">{lesson.summary}</p>
                                   {lesson.details.map((detail, index) => <DetailItem key={index} detail={detail} />)}
                               </div>
                           )}
                        </div>
                    ))}
                 </div>
            </div>
        </Card>
    </div>
  );
};

export default CodeAcademyView;