import { ChangeEvent, useEffect, useState } from 'react'
import { useFetcher } from 'remix'
import TabRenderer from './tab-render.client'

type Props = {
  defaultValue: string
  tabId: number
}

const TabBody = ({ defaultValue, tabId }: Props) => {
  const fetcher = useFetcher()
  const [mounted, setMounted] = useState(false)
  const [tabValue, setTabValue] = useState(defaultValue)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement
    const content = target.value

    setTabValue(content)
    fetcher.submit(
      { content: content },
      { method: 'post', action: `/tabs/${tabId}` }
    )
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <fetcher.Form style={{ flexGrow: '1' }}>
        <textarea
          name="tabContent"
          spellCheck="false"
          autoCapitalize="false"
          defaultValue={defaultValue}
          onChange={(event) => handleChange(event)}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </fetcher.Form>
      {mounted ? <TabRenderer value={tabValue} /> : null}
    </div>
  )
}

export default TabBody
