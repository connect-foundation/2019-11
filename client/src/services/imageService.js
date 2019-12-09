import Resizer from 'react-image-file-resizer';

const SIZE = 250

export const createThumbnail = async (file) => {
    return new Promise(resolve => {
        Resizer.imageFileResizer(
            file,
            SIZE,
            SIZE,
            'JPEG',
            100,
            0,
            uri => resolve(uri.split(',')[1])
            ,
            'base64'
        )
    });
}

export default { createThumbnail }