import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { planet } from '../../styles/main.style';
import { FileInput } from '../../components/atoms/FileInput';
import { TextVariant } from '../../components/atoms/TextVariant';
import { useDispatch, useSelector } from 'react-redux';
import { setCniAction } from '../../redux/register';

export const ChooseProfileCard = () => {
  //
  const dispatch = useDispatch();
  const identity = useSelector((s) => s.registerState.identite);
  const cni = useSelector((s) => s.registerState.cni);
  const [file, setFile] = React.useState(null);

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
        text={'3- Déposez votre pièce d’identité'}
        variant={'title3'}
        marginBottom={planet}
      />

      <View style={styles.content}>
        <View>
          <TextVariant
            text={
              identity === 'Agence immobilière agrée'
                ? 'Photo de votre CNI'
                : "Photo de votre DFE \n(Déclaration d'existence fiscale) ou photo de votre CNI"
            }
            variant={'title4'}
          />
          <FileInput withCam={true} file={file} setFile={setFile} />
        </View>

        {cni && <Image source={{ uri: cni?.path }} style={styles.file} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  file: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    top: 10,
    borderRadius: 10,
  },
});
