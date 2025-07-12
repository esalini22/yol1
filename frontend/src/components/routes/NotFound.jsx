/* eslint-disable linebreak-style */
import MoodBadIcon from '@mui/icons-material/MoodBad'

export default function NotFound() {

  const style = {
    div: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: '"Roboto", sans-serif',
      fontWeight: '200'
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    span: {
      fontSize: '72px'
    },
    p: {
      fontSize: '36px',
    }
  }

  return (
    <div style={style.div}>
      <br className="top-page"/>
      <br className="top-page"/>
      <div style={style.title}>
        <span style={style.span}>4</span><MoodBadIcon sx={{ fontSize: 72 }}/><span style={style.span}>4</span>
      </div>
      <p style={style.p}>The page you are looking for doesn&apos;t exist</p>
    </div>
  )
}