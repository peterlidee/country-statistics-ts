import Link from 'next/link'
import IconLogo from '../svgSnippets/IconLogo'
import SettingsToggle from './SettingsToggle'
import SettingsOptions from './SettingsOptions'

function Header({ home = false }) {
  return (
    <header className='site__header'>
      <Link href='/' className='site__logo'>
        <IconLogo />
        <div className='site__title'>country statistics</div>
      </Link>
      {home && (
        <SettingsToggle>
          <SettingsOptions />
        </SettingsToggle>
      )}
    </header>
  )
}

export default Header
