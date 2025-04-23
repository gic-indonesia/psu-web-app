"use client"

import { ConfigProvider } from "antd"
import { JSX } from "react"

const withTheme = (node: JSX.Element) => {
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#52c41a',
        },
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 7,
          },
        }}
      >
        {node}
      </ConfigProvider>
    </ConfigProvider>
  </>
}

export default withTheme;