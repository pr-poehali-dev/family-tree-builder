import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Save } from 'lucide-react';

type AccountTabProps = {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  privacy: string;
  setPrivacy: (privacy: string) => void;
  handleSaveProfile: () => void;
};

const AccountTab = ({
  name,
  setName,
  email,
  setEmail,
  privacy,
  setPrivacy,
  handleSaveProfile
}: AccountTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Личные данные</CardTitle>
        <CardDescription>
          Управляйте своими личными данными и информацией для контакта
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Имя</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Электронная почта</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="space-y-2">
          <Label>Приватность по умолчанию</Label>
          <RadioGroup 
            value={privacy} 
            onValueChange={setPrivacy}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private" className="font-normal">
                Только я
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="family" id="family" />
              <Label htmlFor="family" className="font-normal">
                Моя семья
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public" className="font-normal">
                Публично
              </Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveProfile}>
          <Save className="mr-2 h-4 w-4" />
          Сохранить изменения
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountTab;