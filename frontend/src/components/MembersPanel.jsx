import { useEffect, useState } from 'react'
import AddMembersModal from './AddMembersModal'
import '../styles/MembersPanel.css'

export default function MembersPanel({ projectId, getMembers }) {
  const [members, setMembers] = useState([])
  const [renderModal, setRenderModal] = useState(false)

  useEffect(() => {
    async function fetchMembers(id) {
      const data = await getMembers(id)
      setMembers(data)
    }
    fetchMembers(projectId)
  }, [projectId, renderModal])

  const getInitials = (firstName = '', lastName = '') => {
    const f = firstName.charAt(0).toUpperCase()
    const l = lastName.charAt(0).toUpperCase()
    return f + l
  }

  const openModal = () => {
    setRenderModal(true)
  }

  const closeModal = () => {
    setRenderModal(false)
  }

  return (
    <div className='members-panel'>
      <div className='members-header'>
        <h2>Usuarios del proyecto</h2>
        <button className='add-member-button' onClick={openModal}>+ Agregar usuario</button>
      </div>

      <div className='members-list'>
        {members.map((member, i) => {
          const user = member.User
          const initials = getInitials(user.first_name, user.last_name)

          return (
            <div key={i} className='member-card'>
              <div className='member-avatar'>
                {initials}
              </div>
              <div className='member-info'>
                <p className='member-name'>
                  {user.first_name} {user.last_name}
                </p>
                <p className='member-email'>
                  {user.email}
                </p>
              </div>
              <span className='member-role'>
                {member.role.name}
              </span>
            </div>
          )
        })}
      </div>

      {renderModal &&
        <AddMembersModal projectId={projectId} handleClose={closeModal} />
      }
    </div>
  )
}
