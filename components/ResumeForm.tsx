
import React from 'react';
import type { UserInput, UserExperienceInput, Education, Skill } from '../types';

interface ResumeFormProps {
  userInput: UserInput;
  setUserInput: React.Dispatch<React.SetStateAction<UserInput>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; type?: string }> = ({ label, name, value, onChange, placeholder, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
);

const TextAreaField: React.FC<{ label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder?: string; rows?: number }> = ({ label, value, onChange, placeholder, rows = 3 }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
);


const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
    <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

export const ResumeForm: React.FC<ResumeFormProps> = ({ userInput, setUserInput, onGenerate, isLoading }) => {

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };
  
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUserInput(prev => ({
                ...prev,
                personalInfo: {
                    ...prev.personalInfo,
                    profilePictureUrl: reader.result as string,
                }
            }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleExperienceChange = (id: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInput(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [name]: value } : exp)
    }));
  };
  
  const addExperience = () => {
    setUserInput(prev => ({ ...prev, experience: [...prev.experience, { id: Date.now(), jobTitle: '', company: '', dates: '', duties: '' }] }));
  };
  
  const removeExperience = (id: number) => {
    setUserInput(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  };

  // Similar handlers for Education and Skills
    const handleEducationChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInput(prev => ({
        ...prev,
        education: prev.education.map(edu => edu.id === id ? { ...edu, [name]: value } : edu)
        }));
    };
    
    const addEducation = () => {
        setUserInput(prev => ({ ...prev, education: [...prev.education, { id: Date.now(), degree: '', institution: '', dates: '' }] }));
    };

    const removeEducation = (id: number) => {
        setUserInput(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
    };

    const handleSkillChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInput(prev => ({
        ...prev,
        skills: prev.skills.map(skill => skill.id === id ? { ...skill, [name]: value } : skill)
        }));
    };

    const addSkill = () => {
        setUserInput(prev => ({ ...prev, skills: [...prev.skills, { id: Date.now(), name: '' }] }));
    };

    const removeSkill = (id: number) => {
        setUserInput(prev => ({ ...prev, skills: prev.skills.filter(skill => skill.id !== id) }));
    };


  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto">
      <h2 className="text-3xl font-bold text-white mb-6">Resume Details</h2>

      <FormSection title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Full Name" name="name" value={userInput.personalInfo.name} onChange={handlePersonalInfoChange} placeholder="John Doe" />
          <InputField label="Job Title" name="title" value={userInput.personalInfo.title} onChange={handlePersonalInfoChange} placeholder="Senior Software Engineer" />
          <InputField label="Email" name="email" type="email" value={userInput.personalInfo.email} onChange={handlePersonalInfoChange} placeholder="john.doe@email.com" />
          <InputField label="Phone" name="phone" value={userInput.personalInfo.phone} onChange={handlePersonalInfoChange} placeholder="(123) 456-7890" />
          <InputField label="Location" name="location" value={userInput.personalInfo.location} onChange={handlePersonalInfoChange} placeholder="San Francisco, CA" />
          <InputField label="LinkedIn URL (Optional)" name="linkedin" value={userInput.personalInfo.linkedin || ''} onChange={handlePersonalInfoChange} placeholder="linkedin.com/in/..." />
          <InputField label="Certificates URL (Optional)" name="certificatesUrl" value={userInput.personalInfo.certificatesUrl || ''} onChange={handlePersonalInfoChange} placeholder="your-portfolio.com/certs" />
        </div>
        <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300">Profile Picture</label>
            <div className="mt-1 flex items-center space-x-4">
                <span className="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-700">
                    {userInput.personalInfo.profilePictureUrl ? (
                        <img className="h-full w-full object-cover" src={userInput.personalInfo.profilePictureUrl} alt="Profile Preview" />
                    ) : (
                        <svg className="h-full w-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.993A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                </span>
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                />
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-3 border border-gray-500 rounded-md shadow-sm text-sm"
                >
                    Change
                </label>
            </div>
        </div>
      </FormSection>

      <FormSection title="AI Generation Section">
        <TextAreaField 
            label="Professional Summary Keywords"
            value={userInput.summaryKeywords}
            onChange={(e) => setUserInput(prev => ({...prev, summaryKeywords: e.target.value}))}
            placeholder="e.g., 'Results-driven software engineer with 8+ years of experience in full-stack development, specializing in React and Node.js. Passionate about building scalable applications and leading teams.'"
            rows={4}
        />
        <p className="text-xs text-gray-400">Provide keywords or a short paragraph for the AI to expand into a professional summary.</p>

        <button 
            onClick={onGenerate} 
            disabled={isLoading} 
            className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-all duration-300 flex items-center justify-center"
        >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
            )}
            {isLoading ? 'Generating...' : 'Generate Summary & Experience with AI'}
        </button>
        <p className="text-xs text-gray-400 mt-2">The AI will rewrite your summary and experience bullet points. Other sections will be copied as-is.</p>
      </FormSection>

      <FormSection title="Work Experience">
        {userInput.experience.map((exp) => (
          <div key={exp.id} className="p-4 border border-gray-700 rounded-md relative">
            <div className="space-y-4">
                <InputField label="Job Title" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleExperienceChange(exp.id, e)} placeholder="Product Manager" />
                <InputField label="Company" name="company" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, e)} placeholder="Innovate Inc." />
                <InputField label="Dates" name="dates" value={exp.dates} onChange={(e) => handleExperienceChange(exp.id, e)} placeholder="Jan 2020 - Present" />
                <TextAreaField label="Duties & Achievements" name="duties" value={exp.duties} onChange={(e) => handleExperienceChange(exp.id, e)} placeholder="Briefly describe your responsibilities and achievements. The AI will expand on these points." />
            </div>
            <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">&times;</button>
          </div>
        ))}
        <button onClick={addExperience} className="mt-2 text-indigo-400 hover:text-indigo-300 font-medium">+ Add Experience</button>
      </FormSection>

      <FormSection title="Education">
        {userInput.education.map((edu) => (
          <div key={edu.id} className="p-4 border border-gray-700 rounded-md relative">
            <div className="space-y-4">
              <InputField label="Degree / Certificate" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, e)} />
              <InputField label="Institution" name="institution" value={edu.institution} onChange={(e) => handleEducationChange(edu.id, e)} />
              <InputField label="Dates" name="dates" value={edu.dates} onChange={(e) => handleEducationChange(edu.id, e)} />
            </div>
            <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">&times;</button>
          </div>
        ))}
        <button onClick={addEducation} className="mt-2 text-indigo-400 hover:text-indigo-300 font-medium">+ Add Education</button>
      </FormSection>

      <FormSection title="Skills">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {userInput.skills.map((skill) => (
            <div key={skill.id} className="relative">
                <InputField label="" name="name" value={skill.name} onChange={(e) => handleSkillChange(skill.id, e)} placeholder="React" />
                <button onClick={() => removeSkill(skill.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">&times;</button>
            </div>
            ))}
        </div>
        <button onClick={addSkill} className="mt-4 text-indigo-400 hover:text-indigo-300 font-medium">+ Add Skill</button>
      </FormSection>
    </div>
  );
};