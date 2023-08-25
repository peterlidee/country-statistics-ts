/**
 * hardcoded footer
 */

import { inconsolata, quicksand } from '@/fonts/Fonts'
import Wrapper from './general/Wrapper'
import IconLogo from './svgSnippets/IconLogo'

const Footer = () => (
  <footer className={`site__footer ${quicksand.className}`}>
    <div className='footer__inner'>
      <div className='footer__header'>
        <h3 className='footer__logo'>
          <IconLogo />
          <div className={`footer__title ${inconsolata.className}`}>
            Country Statistics TS
          </div>
        </h3>
      </div>

      <Wrapper base='footer__section' modifier='about'>
        <h4 className='footer__subtitle'>about</h4>
        <p className='footer__text'>
          Country statistics is a portfolio project to show my React knowledge.
          It is built in Next / Typescript and gets the data from open source
          APIs.
        </p>
      </Wrapper>

      <Wrapper base='footer__section' modifier='data'>
        <h4 className='footer__subtitle'>data apis</h4>
        <a href='https://restcountries.com/'>restcountries.com</a>
        <a href='https://developers.google.com/maps/documentation/javascript/tutorial'>
          Google Maps Javascript Api
        </a>
        <a href='https://developers.google.com/maps/documentation/geocoding/overview'>
          Google GeoCode Api
        </a>
        <a href='https://databank.worldbank.org/source/health-nutrition-and-population-statistics'>
          Worldbank Api
        </a>
        <a href='https://openweathermap.org/current'>openweathermap.org</a>
      </Wrapper>

      <Wrapper base='footer__section' modifier='packages'>
        <h4 className='footer__subtitle'>extra packages</h4>
        <a href='https://www.npmjs.com/package/@react-google-maps/api'>
          Google Maps API
        </a>
        <a href='https://www.npmjs.com/package/react-chartjs-2'>Chart.js</a>
        <a href='https://tanstack.com/query/latest'>TanStack Query</a>
        <a href='https://axios-http.com/docs/intro'>Axios</a>
        <a href='https://www.npmjs.com/package/react-range'>react-range</a>
        <a href='https://github.com/peterlidee/country-statistics-ts/blob/main/package.json'>
          details in package.json
        </a>
      </Wrapper>

      <Wrapper base='footer__section' modifier='framework'>
        <h4 className='footer__subtitle'>framework</h4>
        <a href='https://nextjs.org/'>Next.js</a>
        <a href='https://www.typescriptlang.org/'>TypeScript</a>
      </Wrapper>

      <Wrapper base='footer__section' modifier='deployment'>
        <h4 className='footer__subtitle'>deployment</h4>
        <a href='https://vercel.com/home'>Vercel</a>
      </Wrapper>

      <Wrapper base='footer__section' modifier='testing'>
        <h4 className='footer__subtitle'>testing</h4>
        <a href='https://jestjs.io/'>Jest</a>
        <a href='https://testing-library.com/docs/react-testing-library/intro/'>
          React Testing Library
        </a>
        <a href='https://eslint.org/'>Eslint</a>
      </Wrapper>

      <Wrapper base='footer__section' modifier='sourcecode'>
        <h4 className='footer__subtitle'>sourcecode</h4>
        <a href='https://github.com/peterlidee/country-statistics-ts'>gitHub</a>
      </Wrapper>

      <div className='footer__footer'>
        <a href='mailto:peter@lidee.be' className='footer__contact-link'>
          peter@lidee.be
        </a>
        <span className='footer__copy'>&copy; 2023</span>
      </div>
    </div>
  </footer>
)
export default Footer
