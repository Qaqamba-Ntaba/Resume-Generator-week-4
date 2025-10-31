
import React from 'react';
import type { ResumeData, TemplateName, Experience, Education, Skill } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateName;
}

const MailIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const PhoneIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const LocationIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
const LinkedInIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const CertificateIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M12 2v4h4"/></svg>;

// Template 1: Modern
const TemplateModern: React.FC<{ data: ResumeData }> = ({ data }) => (
    <div className="bg-white text-gray-800 p-8 font-sans w-full">
        <header className="text-center mb-8 border-b-2 border-gray-200 pb-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{data.personalInfo.name}</h1>
            <h2 className="text-xl font-medium text-indigo-600">{data.personalInfo.title}</h2>
            <div className="flex justify-center space-x-4 text-sm text-gray-600 mt-2">
                <span>{data.personalInfo.email}</span><span>&bull;</span>
                <span>{data.personalInfo.phone}</span><span>&bull;</span>
                <span>{data.personalInfo.location}</span>
            </div>
        </header>

        <section className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-200 pb-1 mb-3">Summary</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
        </section>

        <section className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-200 pb-1 mb-3">Experience</h3>
            {data.experience.map((exp: Experience) => (
                <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-md text-gray-800">{exp.jobTitle}</h4>
                        <span className="text-xs font-mono text-gray-500">{exp.dates}</span>
                    </div>
                    <p className="text-sm text-gray-600 italic">{exp.company}</p>
                    <ul className="list-disc list-inside mt-1 space-y-1 text-sm text-gray-700">
                        {exp.bulletPoints.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                </div>
            ))}
        </section>

        <section className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-200 pb-1 mb-3">Education</h3>
            {data.education.map((edu: Education) => (
                <div key={edu.id} className="flex justify-between items-baseline mb-1">
                    <div>
                        <h4 className="font-bold text-md">{edu.degree}</h4>
                        <p className="text-sm text-gray-600 italic">{edu.institution}</p>
                    </div>
                    <span className="text-xs font-mono text-gray-500">{edu.dates}</span>
                </div>
            ))}
        </section>

        <section>
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-700 border-b border-indigo-200 pb-1 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: Skill) => (
                    <span key={skill.id} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">{skill.name}</span>
                ))}
            </div>
        </section>
    </div>
);

// Template 2: Creative
const TemplateCreative: React.FC<{ data: ResumeData }> = ({ data }) => (
    <div className="bg-white text-gray-800 font-sans w-full flex">
        <aside className="w-1/3 bg-slate-800 text-white p-6">
            <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-slate-700 mx-auto mb-4 border-4 border-slate-600 overflow-hidden">
                    {data.personalInfo.profilePictureUrl ? (
                        <img src={data.personalInfo.profilePictureUrl} alt={data.personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-slate-700"></div>
                    )}
                </div>
                <h1 className="text-2xl font-bold tracking-tight">{data.personalInfo.name}</h1>
                <h2 className="text-md font-light text-slate-300">{data.personalInfo.title}</h2>
            </div>
            
            <div className="space-y-4 text-sm">
                <h3 className="text-xs uppercase font-bold text-slate-400 tracking-widest mb-2 border-b border-slate-600 pb-1">Contact</h3>
                <div className="flex items-center space-x-2"><MailIcon /> <span>{data.personalInfo.email}</span></div>
                <div className="flex items-center space-x-2"><PhoneIcon /> <span>{data.personalInfo.phone}</span></div>
                <div className="flex items-center space-x-2"><LocationIcon /> <span>{data.personalInfo.location}</span></div>
                {data.personalInfo.linkedin && (
                    <div className="flex items-center space-x-2"><LinkedInIcon /> <a href={`https://${data.personalInfo.linkedin}`} className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer">{data.personalInfo.linkedin}</a></div>
                )}
                {data.personalInfo.certificatesUrl && (
                    <div className="flex items-center space-x-2"><CertificateIcon /> <a href={`https://${data.personalInfo.certificatesUrl}`} className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer">Certificates</a></div>
                )}
            </div>

            <div className="mt-8">
                <h3 className="text-xs uppercase font-bold text-slate-400 tracking-widest mb-2 border-b border-slate-600 pb-1">Skills</h3>
                <ul className="space-y-1 text-sm list-inside list-disc">
                    {data.skills.map((skill: Skill) => <li key={skill.id}>{skill.name}</li>)}
                </ul>
            </div>

             <div className="mt-8">
                <h3 className="text-xs uppercase font-bold text-slate-400 tracking-widest mb-2 border-b border-slate-600 pb-1">Education</h3>
                {data.education.map((edu: Education) => (
                    <div key={edu.id} className="mb-2">
                        <h4 className="font-bold text-sm">{edu.degree}</h4>
                        <p className="text-xs text-slate-300">{edu.institution}</p>
                        <p className="text-xs text-slate-400">{edu.dates}</p>
                    </div>
                ))}
            </div>
        </aside>
        <main className="w-2/3 p-8">
            <section className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2 border-b-2 border-slate-300 pb-1">Summary</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
            </section>
            
            <section>
                <h3 className="text-xl font-bold text-slate-800 mb-2 border-b-2 border-slate-300 pb-1">Experience</h3>
                {data.experience.map((exp: Experience) => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h4 className="font-bold text-md text-gray-800">{exp.jobTitle}</h4>
                            <span className="text-xs font-mono text-gray-500">{exp.dates}</span>
                        </div>
                        <p className="text-sm text-gray-600 italic">{exp.company}</p>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-sm text-gray-700">
                            {exp.bulletPoints.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        </main>
    </div>
);

// Template 3: Classic
const TemplateClassic: React.FC<{ data: ResumeData }> = ({ data }) => (
    <div className="bg-white text-black p-10 font-serif w-full">
        <header className="text-center mb-6">
            <h1 className="text-3xl font-bold tracking-wider">{data.personalInfo.name}</h1>
            <p className="text-sm mt-1">
                {data.personalInfo.location} | {data.personalInfo.phone} | {data.personalInfo.email}
            </p>
        </header>

        <section className="mb-5">
            <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">PROFESSIONAL SUMMARY</h2>
            <p className="text-sm leading-normal">{data.summary}</p>
        </section>

        <section className="mb-5">
            <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">WORK EXPERIENCE</h2>
            {data.experience.map((exp: Experience) => (
                <div key={exp.id} className="mb-3">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-md font-bold">{exp.company}</h3>
                            <p className="text-sm italic">{exp.jobTitle}</p>
                        </div>
                        <p className="text-sm">{exp.dates}</p>
                    </div>
                    <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                        {exp.bulletPoints.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                </div>
            ))}
        </section>
        
        <section className="mb-5">
            <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">EDUCATION</h2>
            {data.education.map((edu: Education) => (
                <div key={edu.id} className="flex justify-between items-start">
                    <div>
                        <h3 className="text-md font-bold">{edu.institution}</h3>
                        <p className="text-sm italic">{edu.degree}</p>
                    </div>
                    <p className="text-sm">{edu.dates}</p>
                </div>
            ))}
        </section>

        <section>
            <h2 className="text-lg font-bold border-b border-black pb-1 mb-2">SKILLS</h2>
            <p className="text-sm leading-normal">
                {data.skills.map((skill: Skill) => skill.name).join(', ')}
            </p>
        </section>
    </div>
);


export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <TemplateModern data={data} />;
      case 'creative':
        return <TemplateCreative data={data} />;
      case 'classic':
        return <TemplateClassic data={data} />;
      default:
        return <TemplateModern data={data} />;
    }
  };

  return (
    <div className="p-4 md:p-10 bg-gray-900 h-full overflow-y-auto flex items-start justify-center">
        <div id="resume-preview-content" className="w-[210mm] min-h-[297mm] shadow-2xl scale-[0.8] origin-top">
             {renderTemplate()}
        </div>
    </div>
  );
};