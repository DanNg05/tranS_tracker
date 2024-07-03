import { motion } from 'framer-motion';

const animations = {
  initial: {opacity: 0, y: -100, transition: {duration: 0.5}},
  animate: {opacity: 1, y: 0, transition: {duration: 0.5}},
  exit: {opacity: 0, y: 100, transition: {duration: 0.5}}
}

const AnimatedPage = ({children}) => {
  return (
    <motion.div variants={animations} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
    )
}

export default AnimatedPage
