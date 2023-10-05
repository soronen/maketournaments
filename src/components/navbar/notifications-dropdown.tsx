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
import { gql, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'

interface Notification {
  type: string
  message: string
  _id: {
    _data: string
  }
}

const GET_NOTIFICATIONS = gql`
  query GetNotifications($userId: ID!) {
    getNotifications(userId: $userId) {
      sender
      message
      date
    }
  }
`

export const NotificationsDropdown = () => {
  const { data: session } = useSession()
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS, {
    variables: { userId: session?.user._id },
  })

  const gqlNotifications = data?.getNotifications || [] // If data is not available yet, default to an empty array
  const [notifications, setNotifications] = useState<any[]>(gqlNotifications)

  useEffect(() => {
    const eventSource = new EventSource(`/api/sse?`)

    eventSource.onopen = () => {
      console.log('SSE connection opened.')
    }

    eventSource.onmessage = (event) => {
      console.log('triggeri tuli notificaatioihin')
      const newData = JSON.parse(event.data)
      setNotifications((prevNotifications) => [newData, ...prevNotifications])
    }

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

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
            notifications.map((notification, index) => (
              <DropdownItem
                key={index}
                classNames={{
                  base: 'py-2',
                  title: 'text-base font-semibold',
                }}
                description={notification.message}
                textValue={notification.message}
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
