import React, {useEffect} from 'react';
import {View} from 'react-native';
import {planet} from '../../styles/main.style';
import {IDENTITY_TYPES} from '../../assets/constants';
import {RadioField} from '../../components/atoms/Radio';
import {TextVariant} from '../../components/atoms/TextVariant';
import {useDispatch, useSelector} from 'react-redux';
import {setCniAction, setIdentiteAction} from '../../redux/register';

export const IdentityTypeCard = () => {
  //
  const dispatch = useDispatch();
  const pageStep = useSelector(s => s.registerState.pageStep);
  const identity = useSelector(s => s.registerState.identite);
  const cni = useSelector(s => s.registerState.cni);
  const [file, setFile] = React.useState(null);

  const handleSelectType = type => {
    dispatch(setIdentiteAction(type));
  };

  useEffect(() => {
    if (file && file?.path) {
      dispatch(setCniAction(file));
    } else if (cni) {
      dispatch(setCniAction(cni));
    }
  }, [file]);

  return (
    <View>
      <TextVariant
        text={'1- Quelle est votre identité ?'}
        variant={'title3'}
        marginBottom={planet}
      />
      {IDENTITY_TYPES.map(({label, key}) => (
        <View key={key}>
          <RadioField
            label={label}
            active={identity === key}
            onPress={() => handleSelectType(key)}
          />
          <TextVariant text={label === 'Personne morale'} marginLeft={planet} />
        </View>
      ))}
    </View>
  );
};
