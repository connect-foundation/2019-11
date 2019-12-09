import Resizer from 'react-image-file-resizer';

export const createThumbnail = async (file) => {
    return new Promise(resolve => {
        Resizer.imageFileResizer(
            file,
            100,
            100,
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