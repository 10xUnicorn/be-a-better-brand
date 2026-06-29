'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

type Profile = {
  id: string
  full_name: string | null
  email: string | null
  role: string | null
  is_active: boolean | null
  created_at: string
}

type Toast = { message: string; type: 'success' | 'error' } | null

const ROLE_OPTIONS = [
  { value: 'team_member', label: 'Team Member' },
  { value: 'client', label: 'Client' },
  { value: 'collaborator', label: 'Collaborator' },
  { value: 'owner', label: 'Owner' },
]

function getInitials(name: string | null, email: string | null): string {
  if (name) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  if (email) return email[0].toUpperCase()
  return '?'
}

function getRolePillClass(role: string | null): string {
  switch (role) {
    case 'owner': return 'pill-gold'
    case 'client': return 'pill-amber'
    case 'collaborator': return 'pill-purple'
    default: return 'pill-purple'
  }
}

function getRoleLabel(role: string | null): string {
  return ROLE_OPTIONS.find((r) => r.value === role)?.label ?? (role ?? 'Member')
}

function AvatarColor(role: string | null) {
  if (role === 'owner') {
    return { background: 'linear-gradient(135deg, #c9a84c, #e8c97a)', color: '#1e0a4a' }
  }
  return { background: 'linear-gradient(135deg, #1e0a4a, #331081)', color: '#f0c370' }
}

function SkeletonCard() {
  return (
    <div className="panel" style={{ marginBottom: 0 }}>
      <div className="panel-body" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: 'rgba(201,168,76,0.15)', flexShrink: 0,
        }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 14, width: '55%', borderRadius: 6, background: 'rgba(201,168,76,0.18)' }} />
          <div style={{ height: 11, width: '75%', borderRadius: 6, background: 'rgba(201,168,76,0.12)' }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ height: 20, width: 70, borderRadius: 20, background: 'rgba(201,168,76,0.15)' }} />
            <div style={{ height: 20, width: 55, borderRadius: 20, background: 'rgba(201,168,76,0.12)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TeamPage() {
  const supabase = createClient()

  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<Toast>(null)

  // Invite modal state
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteFullName, setInviteFullName] = useState('')
  const [inviteRole, setInviteRole] = useState('team_member')
  const [inviting, setInviting] = useState(false)

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }, [])

  const fetchProfiles = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at')
    if (error) {
      showToast('Failed to load team members', 'error')
    } else {
      setProfiles(data ?? [])
    }
    setLoading(false)
  }, [supabase, showToast])

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles])

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    setInviting(true)
    try {
      const res = await fetch('/api/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, full_name: inviteFullName, role: inviteRole }),
      })
      const json = await res.json()
      if (!res.ok || json.error) {
        showToast(json.error ?? 'Failed to send invite', 'error')
      } else {
        showToast(`Invite sent to ${inviteEmail}`, 'success')
        setShowInvite(false)
        setInviteEmail('')
        setInviteFullName('')
        setInviteRole('team_member')
        fetchProfiles()
      }
    } catch {
      showToast('Network error — please try again', 'error')
    } finally {
      setInviting(false)
    }
  }

  async function handleRoleChange(profileId: string, newRole: string) {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', profileId)
    if (error) {
      showToast('Failed to update role', 'error')
    } else {
      showToast('Role updated', 'success')
      setProfiles((prev) =>
        prev.map((p) => (p.id === profileId ? { ...p, role: newRole } : p))
      )
    }
  }

  async function handleToggleActive(profile: Profile) {
    const newActive = !profile.is_active
    const { error } = await supabase
      .from('profiles')
      .update({ is_active: newActive })
      .eq('id', profile.id)
    if (error) {
      showToast('Failed to update status', 'error')
    } else {
      showToast(newActive ? 'Member reactivated' : 'Member deactivated', 'success')
      setProfiles((prev) =>
        prev.map((p) => (p.id === profile.id ? { ...p, is_active: newActive } : p))
      )
    }
  }

  async function handleResendInvite(profile: Profile) {
    if (!profile.email) return
    try {
      const res = await fetch('/api/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: profile.email,
          full_name: profile.full_name ?? '',
          role: profile.role ?? 'team_member',
        }),
      })
      const json = await res.json()
      if (!res.ok || json.error) {
        showToast(json.error ?? 'Failed to resend invite', 'error')
      } else {
        showToast(`Invite resent to ${profile.email}`, 'success')
      }
    } catch {
      showToast('Network error — please try again', 'error')
    }
  }

  return (
    <>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 14, color: '#7a6090' }}>
          {loading ? '' : `${profiles.length} team member${profiles.length !== 1 ? 's' : ''}`}
        </div>
        <button className="btn btn-gold" onClick={() => setShowInvite(true)}>
          + Invite Team Member
        </button>
      </div>

      {/* Card grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : profiles.length === 0
          ? (
            <div
              className="panel"
              style={{
                gridColumn: '1 / -1',
                marginBottom: 0,
                textAlign: 'center',
                padding: '48px 24px',
              }}
            >
              <div className="serif" style={{ fontSize: 20, color: '#1e0a4a', marginBottom: 8 }}>
                No team members yet
              </div>
              <div style={{ color: '#7a6090', fontSize: 14 }}>
                Invite your first team member to get started.
              </div>
            </div>
          )
          : profiles.map((profile) => {
            const initials = getInitials(profile.full_name, profile.email)
            const avatarStyle = AvatarColor(profile.role)
            const isActive = profile.is_active !== false
            const isOwner = profile.role === 'owner'

            return (
              <div key={profile.id} className="panel" style={{ marginBottom: 0 }}>
                <div className="panel-body">
                  {/* Top row: avatar + info + role dropdown */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, fontWeight: 700, flexShrink: 0,
                      opacity: isActive ? 1 : 0.5,
                      ...avatarStyle,
                    }}>
                      {initials}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        className="serif"
                        style={{
                          fontSize: 15, fontWeight: 700, color: '#1e0a4a',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}
                      >
                        {profile.full_name ?? '(No name)'}
                      </div>
                      <div style={{
                        fontSize: 12, color: '#5a4070', marginTop: 2,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>
                        {profile.email ?? '—'}
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                        <span className={`pill ${getRolePillClass(profile.role)}`}>
                          {getRoleLabel(profile.role)}
                        </span>
                        <span className={`pill ${isActive ? 'pill-green' : 'pill-amber'}`}>
                          {isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>

                    {/* Role dropdown — hidden for owners */}
                    {!isOwner && (
                      <select
                        value={profile.role ?? 'team_member'}
                        onChange={(e) => handleRoleChange(profile.id, e.target.value)}
                        style={{ width: 'auto', padding: '5px 10px', fontSize: 11, flexShrink: 0 }}
                      >
                        {ROLE_OPTIONS.filter((r) => r.value !== 'owner').map((r) => (
                          <option key={r.value} value={r.value}>{r.label}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Action buttons row */}
                  {!isOwner && (
                    <div style={{
                      display: 'flex', gap: 8, marginTop: 14,
                      paddingTop: 12, borderTop: '1px solid rgba(240,195,112,0.18)',
                    }}>
                      <button
                        className={`btn btn-sm ${isActive ? 'btn-danger' : 'btn-outline'}`}
                        onClick={() => handleToggleActive(profile)}
                      >
                        {isActive ? 'Deactivate' : 'Reactivate'}
                      </button>
                      {!isActive && (
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => handleResendInvite(profile)}
                        >
                          Resend Invite
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="modal-overlay" onClick={() => setShowInvite(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: '#1e0a4a', marginBottom: 24 }}>
              Invite Team Member
            </h3>

            <form onSubmit={handleInvite}>
              <div style={{ marginBottom: 16 }}>
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="team@beabetterbrand.com"
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={inviteFullName}
                  onChange={(e) => setInviteFullName(e.target.value)}
                  placeholder="Jane Smith"
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label>Role</label>
                <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}>
                  <option value="team_member">Team Member</option>
                  <option value="client">Client</option>
                  <option value="collaborator">Collaborator</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowInvite(false)}
                  disabled={inviting}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold" disabled={inviting}>
                  {inviting ? 'Sending…' : 'Send Invite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </>
  )
}
