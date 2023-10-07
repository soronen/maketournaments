import React, { useEffect, useState } from 'react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
} from '@nextui-org/react'
import { NotificationIcon } from '../icons/navbar/notificationicon'
import {
  GET_ALL_NOTIFICATIONS_BY_RECEIVER_EMAIL,
  MARK_NOTIFICATION_AS_READ,
} from '@/graphql/clientQueries/notificationOperations'
import { useSession } from 'next-auth/react'
import { useQuery, useMutation } from '@apollo/client'

interface Notificationz {
  id: string
  senderEmail: string
  message: string
  date: string
}

export const NotificationsDropdown = () => {
  const { data: session } = useSession()
  const userEmail = session?.user?.email || ''
  const [notifications, setNotifications] = useState<Notificationz[]>([])

  const { data: initialData } = useQuery(GET_ALL_NOTIFICATIONS_BY_RECEIVER_EMAIL, {
    variables: { receiverEmail: userEmail },
    skip: !userEmail,
  })
  const [markNotificationAsRead] = useMutation(MARK_NOTIFICATION_AS_READ)

  useEffect(() => {
    console.log(initialData)
    if (initialData && initialData.getAllNotificationsByReceiverEmail) {
      setNotifications(initialData.getAllNotificationsByReceiverEmail)
    }
  }, [initialData])

  const handleNotificationClick = async (notificationId: string) => {
    try {
      await markNotificationAsRead({
        variables: { id: notificationId },
      })
    } catch (error) {
      console.error('Failed to update notification:', error)
    }
  }

  useEffect(() => {
    const eventSource = new EventSource(`/api/sse`)

    eventSource.onopen = () => {
      console.log('SSE connection opened.')
    }

    eventSource.onmessage = (event) => {
      // Assuming event.data contains the notification
      const newNotification = JSON.parse(event.data)

      if (newNotification.receiverEmail === userEmail) {
        setNotifications((prevNotifications) => [newNotification, ...prevNotifications])
      }
    }

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [userEmail])

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <NavbarItem>
          <NotificationIcon />
        </NavbarItem>
      </DropdownTrigger>
      <DropdownMenu className="w-80" aria-label="Avatar Actions">
        <DropdownSection title="Notifications">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownItem
                key={notification.id}
                classNames={{
                  base: 'py-2',
                  title: 'text-base font-semibold',
                }}
                description={`${notification.message} ${notification.senderEmail}`}
                textValue={notification.message}
                onClick={() => handleNotificationClick(notification.id)}
              >
                New Invitation
              </DropdownItem>
            ))
          ) : (
            <DropdownItem
              classNames={{
                base: 'py-2',
                title: 'text-base font-semibold',
              }}
              description="No new notifications"
              textValue="No new notifications"
            >
              No New Notifications
            </DropdownItem>
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
