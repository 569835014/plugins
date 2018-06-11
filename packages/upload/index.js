/**
 *
 */
import Upload from './src/Upload.vue';
import UploadClass from '../../libraries/upload/Upload'
Upload.install = function (Vue) {
  Vue.use(UploadClass);
  Vue.component(Upload.name, Upload);
};

export default Upload;
