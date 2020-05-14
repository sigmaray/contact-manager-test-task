import Noty from 'noty';
import 'noty/src/noty.scss';
import 'noty/src/themes/mint.scss';

export default function (text, type = 'information') {
  return new Noty({
    text: text,
    type: type,
    dismissQueue: true,
    layout: 'topCenter',
    closeWith: ['click', 'button'],
    timeout: 5000
  }).show();
}
