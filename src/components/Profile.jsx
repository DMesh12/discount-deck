import React, { useState } from 'react';
import { Camera, Mail, Phone, User, Calendar, Edit2 } from 'lucide-react';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: 'Daniel Cohen',
        age: 28,
        gender: 'Male',
        email: 'daniel.cohen@example.com',
        phone: '+972 50 123 4567',
        photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    });

    return (
        <div className="p-6 h-full flex flex-col bg-gray-50">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <button className="text-primary text-sm font-medium flex items-center gap-1">
                    <Edit2 size={16} /> Edit
                </button>
            </div>

            {/* Profile Photo */}
            <div className="flex flex-col items-center mb-8">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden relative mb-4">
                    <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                        <Camera className="text-white" />
                    </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-500 text-sm">Member since 2024</p>
            </div>

            {/* Details Cards */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
                <ProfileItem icon={User} label="Gender" value={profile.gender} />
                <Divider />
                <ProfileItem icon={Calendar} label="Age" value={profile.age} />
                <Divider />
                <ProfileItem icon={Mail} label="Email" value={profile.email} />
                <Divider />
                <ProfileItem icon={Phone} label="Phone" value={profile.phone} />
            </div>

            <button className="mt-auto w-full py-4 text-red-500 font-bold bg-white rounded-xl shadow-sm hover:bg-red-50 transition-colors">
                Log Out
            </button>
        </div>
    );
};

const ProfileItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center p-4 hover:bg-gray-50 transition-colors">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mr-4">
            <Icon size={20} />
        </div>
        <div>
            <p className="text-xs text-gray-400 font-medium">{label}</p>
            <p className="text-gray-900 font-medium">{value}</p>
        </div>
    </div>
);

const Divider = () => <div className="h-px bg-gray-100 mx-4" />;

export default Profile;
