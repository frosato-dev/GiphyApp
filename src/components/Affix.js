import React from 'react';
import { AutoAffix } from 'react-overlays';

export default (WrappedComponent) => {

  return class extends React.Component {

    render() {
      const {
        viewportOffsetTop,
        container,
        affixClassName,
        ...rest
      } = this.props;

      return (
        <AutoAffix
          viewportOffsetTop={viewportOffsetTop}
          container={container}
          affixClassName={affixClassName}
        >
          <div>
            <WrappedComponent {...rest}/>
          </div>
        </AutoAffix>
      )
    }
  };
}
