import { useState } from 'react';
import { GitBranch, Settings, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import TreesTab from '@/components/profile/TreesTab';
import AccountTab from '@/components/profile/AccountTab';
import SettingsTab from '@/components/profile/SettingsTab';

const Profile = () => {
  const [name, setName] = useState('Анна Иванова');
  const [email, setEmail] = useState('anna@example.com');
  const [privacy, setPrivacy] = useState('family');
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  const userTrees = [
    {
      id: 1,
      name: 'Семья Ивановых',
      members: 32,
      lastEdit: '2 дня назад',
      privacy: 'family',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Родословная по маминой линии',
      members: 18,
      lastEdit: '3 недели назад',
      privacy: 'private',
      thumbnail: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Исследование фамилии Петровых',
      members: 45,
      lastEdit: '1 месяц назад',
      privacy: 'public',
      thumbnail: '/placeholder.svg'
    }
  ] as const;
  
  const handleSaveProfile = () => {
    alert('Профиль успешно сохранен!');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="md:w-1/3">
              <ProfileSidebar 
                name={name} 
                email={email} 
                userTrees={userTrees} 
              />
            </div>
            
            <div className="md:w-2/3">
              <Tabs defaultValue="trees">
                <TabsList className="mb-8 grid w-full grid-cols-3">
                  <TabsTrigger value="trees">
                    <GitBranch className="mr-2 h-4 w-4" />
                    Мои деревья
                  </TabsTrigger>
                  <TabsTrigger value="account">
                    <User className="mr-2 h-4 w-4" />
                    Личные данные
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Настройки
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="trees">
                  <TreesTab userTrees={userTrees} />
                </TabsContent>
                
                <TabsContent value="account">
                  <AccountTab 
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    privacy={privacy}
                    setPrivacy={setPrivacy}
                    handleSaveProfile={handleSaveProfile}
                  />
                </TabsContent>
                
                <TabsContent value="settings">
                  <SettingsTab 
                    emailNotifications={emailNotifications}
                    setEmailNotifications={setEmailNotifications}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;