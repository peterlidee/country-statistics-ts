import Link from 'next/link'
import IconLogo from '../svgSnippets/IconLogo'
import SettingsToggle from './SettingsToggle'
import SettingsOptions from './SettingsOptions'

import PropTypes from 'prop-types'
import { inconsolata } from '@/fonts/Fonts'

function Header({ home = false }) {
  return (
    <header className='site__header'>
      <Link href='/' className='site__logo'>
        <IconLogo />
        <div className={`site__title ${inconsolata.className}`}>
          country statistics
        </div>
      </Link>
      {home && (
        <SettingsToggle>
          <SettingsOptions />
        </SettingsToggle>
      )}
    </header>
  )
}

Header.propTypes = {
  home: PropTypes.bool,
}

export default Header
