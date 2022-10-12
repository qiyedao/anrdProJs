/** @jsxImportSource @emotion/react */

import { PageContainer } from '@ant-design/pro-components';
import { css } from '@emotion/react';
import { Alert, Card, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'umi';
const AlertCss = css`
  .ant-alert-message {
    font-size: 30px;
  }
`;

const Welcome: React.FC = () => {
  const intl = useIntl();

  return (
    <PageContainer>
      <Card>
        <div css={AlertCss}>
          <Alert
            message={intl.formatMessage({
              id: 'pages.welcome.alertMessage',
              defaultMessage: 'Faster and stronger heavy-duty components have been released.',
            })}
            type="success"
            showIcon
            banner
            style={{
              margin: -12,
              marginBottom: 24,
            }}
          />
        </div>
        <Typography.Text strong>
          <a
            className=" text-red-400"
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.link" defaultMessage="Welcome" />
          </a>
        </Typography.Text>
        <div className=" text-9xl text-red-900">tailwind</div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
