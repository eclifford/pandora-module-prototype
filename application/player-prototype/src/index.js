import { registerRole, send, ROLES, MESSAGE_TYPE } from '@pandora/messaging';
import {
  start as authStart,
  stop as authStop
} from '@pandora/auth';
import {
  start as loggerStart,
  stop as loggerStop
} from '@pandora/logger';
import {
  start as playerStart,
  stop as playerStop
} from '@pandora/player';
import {
  start as uiLoginStart,
  stop as uiLoginStop
} from '@pandora/ui-login';
import {
  start as uiPlayerStart,
  stop as uiPlayerStop
} from '@pandora/ui-player';

loggerStart();
authStart();
playerStart();
uiLoginStart();

// Coordinator logic here