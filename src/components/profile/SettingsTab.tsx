import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save } from 'lucide-react';

type SettingsTabProps = {
  emailNotifications: boolean;
  setEmailNotifications: (value: boolean) => void;
};

const SettingsTab = ({ emailNotifications, setEmailNotifications }: SettingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки</CardTitle>
        <CardDescription>
          Настройте параметры уведомлений и отображения
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Уведомления</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Уведомления по электронной почте</Label>
              <p className="text-sm text-muted-foreground">
                Получать уведомления о действиях с вашими деревьями
              </p>
            </div>
            <Switch 
              id="email-notifications" 
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="digest">Еженедельный дайджест</Label>
              <p className="text-sm text-muted-foreground">
                Получать сводку новостей и советов каждую неделю
              </p>
            </div>
            <Switch id="digest" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Внешний вид</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-4 flex items-center space-x-4">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <div>
                <p className="font-medium">Классическая тема</p>
                <p className="text-sm text-muted-foreground">Стандартное оформление сервиса</p>
              </div>
            </div>
            <div className="border rounded-md p-4 flex items-center space-x-4">
              <div className="w-4 h-4 rounded-full border"></div>
              <div>
                <p className="font-medium">Темная тема</p>
                <p className="text-sm text-muted-foreground">Темное оформление для комфортной работы</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => alert('Настройки сохранены!')}>
          <Save className="mr-2 h-4 w-4" />
          Сохранить настройки
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SettingsTab;