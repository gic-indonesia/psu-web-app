import { Fragment } from 'react';

const AxiosInstanceInterceptorToast = (props: { title: string; message: string; }) => {
  const { title, message } = props;
  return (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <h6 className='toast-title font-weight-bold'>{title}</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>{message}</span>
      </div>
    </Fragment>
  );
}

export default AxiosInstanceInterceptorToast;