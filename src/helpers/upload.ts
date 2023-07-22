import { ImageOrVideo } from 'react-native-image-crop-picker';
import { supabase } from './supabase';
import { Platform, ImageSourcePropType } from 'react-native';

export const getFilename = (path: string) => {
  const filename = path.split('/').pop();
  return filename;
};

export const uploadAvatar = async (
  file: ImageOrVideo,
  userId: string,
): Promise<string | null> => {
  const blob = {
    type: file.mime,
    uri: file.path,
    name: Platform.select({
      android: getFilename(file.path),
      ios: file.filename,
      default: 'image.png',
    }),
  };

  const formData = new FormData();
  formData.append('file', blob);

  const fileExt = blob.name.split('.').pop();
  const filePath = `${userId}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, formData, {
      upsert: true,
    });
  if (error) throw error;

  const { data: avatar } = supabase.storage
    .from('avatars')
    .getPublicUrl(data.path);

  return avatar.publicUrl;
};

export const getAvatarSource = (
  avatar: string | ImageOrVideo | null | undefined,
): ImageSourcePropType => {
  // у supabase bucket после загрузки нового аватара не меняется юрл
  // юрл аватара всегда состоит из id пользователя
  // unix нужен для сбрасывания кэша
  const unix = new Date().getTime();
  if (!avatar) return require('../../assets/avatar_placeholder.jpg');
  if (typeof avatar !== 'string') return { uri: avatar.path + '?' + unix };
  return { uri: avatar + '?' + unix };
};
