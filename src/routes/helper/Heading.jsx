import { Link } from 'react-router-dom'
import arrowIcon from './../../assets/arrow-back.svg'

const style = {
  fontSize: '1.7em',
  fontWeight: 'bold',
  padding: '1rem',
}

const Heading = (props) => (
  <div className="d-flex align-items-center justify-content-between w-100 mb-30">
    <div>
      <h1 style={style}>{props.title}</h1>
    </div>
    <div>
      <Link to={`../`}>
        <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_145_117)">
            <rect x="36.3896" y="3" width="47.2201" height="47.2201" rx="10.6245" transform="rotate(45 36.3896 3)" fill="white" />
            <path d="M40.7875 26.7603L31.521 36.163C31.2843 36.4032 31.2843 36.7925 31.521 37.0326L40.7875 46.4353" stroke="#E70B27" stroke-width="2.361" stroke-linecap="round" />
          </g>
          <defs>
            <filter id="filter0_d_145_117" x="-3.68951" y="-3.68951" width="80.1583" height="80.1583" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="3.34476" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_145_117" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_145_117" result="shape" />
            </filter>
          </defs>
        </svg>
      </Link>
    </div>
  </div>
)

export default Heading

Heading.defaultProps = {
  title: 'عنوان',
  lead: '',
}
