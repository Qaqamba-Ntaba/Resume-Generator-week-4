
import React, { useState } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import type { ResumeData, TemplateName, UserInput } from './types';
import { generateResumeContent } from './services/geminiService';

// TypeScript declarations for libraries loaded via CDN
declare const jspdf: any;
declare const htmlToImage: any;
declare const htmlToDocx: any;

const initialUserInput: UserInput = {
    personalInfo: {
        name: 'John Doe',
        title: 'Senior Software Engineer',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johndoe',
        certificatesUrl: 'github.com/johndoe',
        profilePictureUrl: '',
    },
    summaryKeywords: 'Experienced full-stack developer specializing in React, Node.js, and cloud technologies. Proven track record of delivering high-quality software solutions.',
    experience: [
        { id: 1, jobTitle: 'Senior Software Engineer', company: 'Tech Solutions Inc.', dates: 'Jan 2020 - Present', duties: 'Led a team to develop a new client-facing dashboard. Mentored junior developers. Improved application performance by 20%.' },
        { id: 2, jobTitle: 'Software Engineer', company: 'Innovate Co.', dates: 'Jun 2017 - Dec 2019', duties: 'Worked on the core product API. Wrote unit and integration tests. Refactored legacy code to modern standards.' },
    ],
    education: [
        { id: 1, degree: 'B.S. in Computer Science', institution: 'State University', dates: '2013 - 2017' }
    ],
    skills: [
        { id: 1, name: 'JavaScript' }, { id: 2, name: 'TypeScript' }, { id: 3, name: 'React' },
        { id: 4, name: 'Node.js' }, { id: 5, name: 'AWS' }, { id: 6, name: 'Docker' }
    ]
};

const initialResumeData: ResumeData = {
    personalInfo: initialUserInput.personalInfo,
    summary: 'Highly skilled and results-oriented Senior Software Engineer with over 7 years of experience in designing, developing, and deploying scalable web applications. Expert in JavaScript, React, and Node.js with a strong background in cloud infrastructure and DevOps principles. A collaborative team player dedicated to delivering robust, high-performance software.',
    experience: [
        { id: 1, jobTitle: 'Senior Software Engineer', company: 'Tech Solutions Inc.', dates: 'Jan 2020 - Present', bulletPoints: ['Spearheaded the development of a new client-facing analytics dashboard using React and D3.js, resulting in a 40% increase in user engagement.', 'Mentored and coached a team of 4 junior developers, improving team productivity and code quality.', 'Optimized backend APIs and database queries, leading to a 20% reduction in application response time.'] },
        { id: 2, jobTitle: 'Software Engineer', company: 'Innovate Co.', dates: 'Jun 2017 - Dec 2019', bulletPoints: ['Contributed to the development of the core product REST API using Node.js and Express, serving over 1 million requests per day.', 'Enhanced code quality by increasing unit test coverage from 60% to 95% using Jest and React Testing Library.', 'Successfully refactored a critical legacy module to a modern microservices architecture, improving maintainability and scalability.'] },
    ],
    education: initialUserInput.education,
    skills: initialUserInput.skills
};


const App: React.FC = () => {
    const [userInput, setUserInput] = useState<UserInput>(initialUserInput);
    const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
    const [template, setTemplate] = useState<TemplateName>('modern');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const aiContent = await generateResumeContent(userInput);
            setResumeData(prev => ({
                ...prev,
                personalInfo: userInput.personalInfo,
                education: userInput.education,
                skills: userInput.skills,
                summary: aiContent.summary || prev.summary,
                experience: aiContent.experience || prev.experience,
            }));
        } catch (e: any) {
            setError(e.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSavePdf = async () => {
        const element = document.getElementById('resume-preview-content');
        if (!element) return;
        try {
            const dataUrl = await htmlToImage.toPng(element, { quality: 1.0, pixelRatio: 2 });
            const pdf = new jspdf.jsPDF({
                orientation: 'portrait',
                unit: 'px',
                format: [element.offsetWidth, element.offsetHeight]
            });
            pdf.addImage(dataUrl, 'PNG', 0, 0, element.offsetWidth, element.offsetHeight);
            pdf.save(`${resumeData.personalInfo.name.replace(' ', '_')}_Resume.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const handleSaveWord = async () => {
        const element = document.getElementById('resume-preview-content');
        if (!element) return;
        try {
            const docx = await htmlToDocx(element.outerHTML, {
                margins: { top: 720, right: 720, bottom: 720, left: 720 }, // 0.5 inch margins
            });
            const blobUrl = URL.createObjectURL(docx);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${resumeData.personalInfo.name.replace(' ', '_')}_Resume.docx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error generating Word doc:', error);
        }
    };


    const TemplateSelector: React.FC = () => {
        const templates: { name: TemplateName, label: string }[] = [
            { name: 'modern', label: 'Modern' },
            { name: 'creative', label: 'Creative' },
            { name: 'classic', label: 'Classic' },
        ];
        return (
            <div className="flex space-x-2 bg-gray-900 p-2 rounded-lg">
                {templates.map(t => (
                    <button
                        key={t.name}
                        onClick={() => setTemplate(t.name)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                            template === t.name
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
        );
    };
    
    const SaveButtons: React.FC = () => (
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
            <button onClick={handleSavePdf} className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M10 12v6"/><path d="M13 15h-6"/><path d="M16 12h-3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3"/><path d="M16 18h-3"/></svg>
                Save PDF
            </button>
            <button onClick={handleSaveWord} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 19V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2z"/><path d="M15 9h-5a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5"/><path d="M15 13H8"/></svg>
                Save Word
            </button>
        </div>
    );


    return (
        <div className="bg-gray-900 min-h-screen text-white font-sans">
            <header className="bg-gray-800/50 backdrop-blur-sm p-4 sticky top-0 z-10 flex justify-between items-center shadow-lg">
                <h1 className="text-2xl font-bold text-white">AI Resume Generator</h1>
                <TemplateSelector />
            </header>
            <main className="grid grid-cols-1 lg:grid-cols-2 lg:h-[calc(100vh-68px)]">
                <div className="lg:h-full lg:overflow-y-auto bg-gray-900">
                    <ResumeForm 
                        userInput={userInput}
                        setUserInput={setUserInput}
                        onGenerate={handleGenerate}
                        isLoading={isLoading}
                    />
                     {error && <div className="m-6 p-4 bg-red-900 border border-red-700 text-red-200 rounded-lg">{error}</div>}
                </div>
                <div className="lg:h-full lg:overflow-y-auto bg-gray-700">
                    <ResumePreview data={resumeData} template={template} />
                </div>
            </main>
            <SaveButtons />
        </div>
    );
};

export default App;