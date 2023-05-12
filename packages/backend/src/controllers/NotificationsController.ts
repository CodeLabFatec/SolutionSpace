import { notificationsRepository } from '../repos/postgres/repositories/notificationsRepository';
import { userRepository } from '../repos/postgres/repositories/userRepository';
import { Request, Response } from 'express';

class NotificationsController {

    async updateAllNotifications(req: Request, res: Response) {
        const { user_id } = req.params;

        try {
            const notifications = await notificationsRepository.find({ where: { user: { user_id } } })

            if(notifications.length > 0){
                notifications.forEach(item => {
                    item.hasRead = true
                })
    
                await notificationsRepository.save(notifications)
            }

            const user = await userRepository.findOne({ 
                where: { user_id }, 
                relations: { team: true, group: true, notifications: true } })

            if(!user) return res.status(404).json({ message: 'User not found' })

            user.notifications = user.notifications.filter(item => !item.hasRead)

            return res.status(200).json(user)

        } catch(error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` })
        }
    }

    async updateNotification(req: Request, res: Response) {
        const { notification_id } = req.params;

        try {
            const notification = await notificationsRepository.findOne({ where: { notification_id } })
            
            if(!notification){
                return res.status(404).json({ message: 'Notification not found' })
            }

            notification.hasRead = true

            await notificationsRepository.save(notification)

            return res.status(200).json(notification)

        } catch(error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` })
        }
    }

    async getNotificationsByUser(req: Request, res: Response) {
        const { user_id } = req.params;

        try {
            const notifications = await notificationsRepository.find({ where: { user: { user_id } } })

            return res.status(200).json(notifications);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }

    async getNotificationById(req: Request, res: Response) {
        const { notification_id } = req.params;

        try {
            const status = await notificationsRepository.findOneBy({ notification_id });

            if (!status) return res.status(404).json('Notification not found');

            return res.status(200).json(status);
        } catch (error) {
            return res.status(500).json({ message: `Internal Server Error - ${error}` });
        }
    }
}

const notificationsController = new NotificationsController()
export default notificationsController