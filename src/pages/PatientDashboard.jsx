// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function Dashboard() {
    const [activeSection, setActiveSection] = useState('appointments');

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const renderContent = () => {
        switch (activeSection) {
            case 'appointments':
                return (
                    <div data-aos="fade-up">
                        <h3 className="text-xl font-bold mb-4">Appointments</h3>
                        <table className="w-full border-collapse mt-4">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="border p-2">Date</th>
                                    <th className="border p-2">Time</th>
                                    <th className="border p-2">Doctor</th>
                                    <th className="border p-2">Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">2024-11-01</td>
                                    <td className="border p-2">10:00 AM</td>
                                    <td className="border p-2">Dr. Smith</td>
                                    <td className="border p-2">Routine Checkup</td>
                                </tr>
                              
                            </tbody>
                        </table>
                    </div>
                );
            case 'prescriptions':
                return (
                    <div data-aos="fade-up">
                        <h3 className="text-xl font-bold mb-4">Prescriptions</h3>
                        <table className="w-full border-collapse mt-4">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="border p-2">Medication</th>
                                    <th className="border p-2">Dosage</th>
                                    <th className="border p-2">Frequency</th>
                                    <th className="border p-2">Prescribing Doctor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">Atorvastatin</td>
                                    <td className="border p-2">10 mg</td>
                                    <td className="border p-2">Once Daily</td>
                                    <td className="border p-2">Dr. Adams</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                );
            case 'medicalHistory':
                return (
                    <div data-aos="fade-up">
                        <h3 className="text-xl font-bold mb-4">Medical History</h3>
                        <p>Details about past medical conditions, treatments, and surgeries will be displayed here.</p>
                    </div>
                );
            case 'labResults':
                return (
                    <div data-aos="fade-up">
                        <h3 className="text-xl font-bold mb-4">Lab Results</h3>
                        <p>Details about lab results and reports will be displayed here.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/5 bg-gray-800 text-white p-6">
                <h2 className="text-2xl font-bold mb-6">Patient Dashboard</h2>
                <div className="nav-item mb-4 cursor-pointer" onClick={() => setActiveSection('appointments')}>Appointments</div>
                <div className="nav-item mb-4 cursor-pointer" onClick={() => setActiveSection('prescriptions')}>Prescriptions</div>
                <div className="nav-item mb-4 cursor-pointer" onClick={() => setActiveSection('medicalHistory')}>Medical History</div>
                <div className="nav-item mb-4 cursor-pointer" onClick={() => setActiveSection('labResults')}>Lab Results</div>
            </div>
            <div className="w-4/5 p-8 bg-gray-100 overflow-auto">
                {renderContent()}
            </div>
        </div>
    );
}

export default Dashboard;
