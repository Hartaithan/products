import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { FC } from 'react';
import { Fonts, Typography, fonts, typography } from '../styles/typography';
import { Colors, colors } from '../styles/colors';
import { Range } from '../models/HelperModel';

interface ITextProps extends TextProps {
  /** typography */
  tg: Typography;
  /** font weight */
  fw?: Fonts;
  /** color */
  c?: Colors;
  /** color shade [0..9] */
  cs?: Range<0, 9>;
  align?: TextStyle['textAlign'];
}

const Text: FC<ITextProps> = props => {
  const {
    tg,
    fw = 400,
    c = 'gray',
    cs = 9,
    align = 'auto',
    style,
    children,
    ...rest
  } = props;
  return (
    <RNText
      style={[
        {
          ...typography[tg],
          fontFamily: fonts[fw],
          color: colors[c][cs],
          textAlign: align,
        },
        style,
      ]}
      {...rest}>
      {children}
    </RNText>
  );
};

export default Text;
