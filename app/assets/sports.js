import { Colors } from 'react-native-paper'
import footballIcon from './images/sports/football.png'
import basketballIcon from './images/sports/basketball.png'
import volleyballIcon from './images/sports/volleyball.png'
import squashIcon from './images/sports/squash.png'
import boardIcon from './images/sports/board.png'

export default {
  football: {
    name: 'Football',
    icon: footballIcon,
    color: Colors.green500,
  },
  volleyball: {
    name: 'Volleyball',
    icon: volleyballIcon,
    color: Colors.blueGrey500,
  },
  squash: {
    name: 'Squash',
    icon: squashIcon,
    color: Colors.brown500,
  },
  board: {
    name: 'Board game',
    icon: boardIcon,
    color: Colors.deepOrange500,
  },
  basketball: {
    name: 'Basketball',
    icon: basketballIcon,
    color: Colors.red500,
  },
}
