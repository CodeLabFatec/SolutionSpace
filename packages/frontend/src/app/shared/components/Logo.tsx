import * as React from 'react'

export function Logo(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={232}
      height={65}
      viewBox='0 0 232 65'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      {...props}
    >
      <path fill='url(#pattern0)' d='M0 0H232V65H0z' />
      <defs>
        <pattern id='pattern0' patternContentUnits='objectBoundingBox' width={1} height={1}>
          <use xlinkHref='#image0_210_157' transform='scale(.00431 .01538)' />
        </pattern>
        <image
          id='image0_210_157'
          width={232}
          height={65}
          xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAABBCAYAAADbuuheAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAqDSURBVHhe7Z1NjFZXGcdPpRmH6UylgBo+bEKog5smCqSNdTEkNtEapiR1YaEu2kQgceECSOpKBt0YM2w0afjQ1IUDZWEXDkld1GTYkNhANHVTYGMqMG3ttLXADFUR39+dc5gzZ55zv973ve/p5PklN++978e55z73+T/POc+5DPdt27btrlEUJUk+Y18VRUkQFaiiJIwKVFESRgWqKAmjAlWUhFGBKkrCqEAVJWFUoIqSMCpQRUkYFaiiJIwKVFESRgWqKAmjAlWUhNF/zaIobbDqqVHz4MiT2f7HU6+bj/44me13Cs2gilKT1c98zzz01NNmxcBAtj30nafN2ueet592BhWootSg/8tbzOd2PGluvfkX87+5WfuuMUOPfyP7rFOoQBWlBg+OfNPM/P4V896vXzLTvxy3786z6ls77V77qEAVpSL3rVxp+jY+bD4+96fs+N/X/pFlUsfK4a+YFavX2KP2UIEqSkUGHv2auX3lkj2a59abf7V78zzw6FftXntoFVdRKsD8kiHs/WvWmv/OvG/fbWW6gQHz2VZWdcxdfsu8+5uXzN25OftOPVSgidC6D2br1q32aIGTJ0/aveXHvn37zN27i93v7NmzZnp62h61TyfsiigHH/t6VgCqyidX3zY3/nze3HzjfC2xqkATAWdlC9m+fbvdW35cuHDB7i2wf/9+c/HiRXvUPu3alaUUqrXtcmd21rzzq/FsvloFnYMqSXLw4EFz7NixRdvOnZ2rjpahb8OXRHH+54OZLCt++NofzHRLdG4L+eTqghhZJ93w4k8qF49UoEqSDA8PZ1nO39avX28/bYY73vomIDiEeHXsx+b9iZfNR69NZsUit4Vc/8VPlwh3xcoBu1cOFaiiRLjTypTv/e7lew8i8BifJMQ8+tZvtHsmy7o6xFWUDnLrjfPm7VbGZDi76tuj2aN8/Y8MZ2uhPuHQFVFTXFrz3WezNVIyKVm3KipQRSmA6ivDWYasH7ZeVz/z7JK5qb/EAgyHqeD+/cUfZU8bVc28jq5UcbdsWfos4rVr18zNmzft0VLWrVuXlcSZe7A5qOhdvnw5e837Pb8ZHBy0R/NQrncle9ofGRnJ+sY+8BntUtoP6evrM5s2bbJHC1y6FDe0uwb36ihzDUXVRq5tx44d99oH1+a5c+ey4zJIfcQO169fz9qhzSrQBssY2NW3P/1y9nX3ICSvinv8+PFFNoTJyclsKwPnZOuGXdc+94Lp27CxJdif2Xfm3xt6/Al7ZMy/pl43H7x6xh7VpysClQxPVU66YIyCAUdHR+07cbhpp0+fFp1cuqEnTpzINs69e/du++5ScM5Dhw4tcs7NmzebM2eWGnjXrl1ZsPHhJnOOomu4ceOGOXXqlLgGl+dIVC9pf2hoyL67GPp/5MiRzKliYOfDhw/fc8wYZdoC+opNY33yQVRHjx5dct+qCrQK7t7n2ZX+81lVuz7w2BPmC99/IRv6Mk9lePvw2M/tp/O828qas97jf3Xp6RAXx+PmlREncPP4vp9hixgfH88VJ1AdxCGqtOvgN2WvAUfgGiYmJpZk+xj0fWxsLFcIrv+xZQjeJzAUiROK2qLf9D/PsUOwDecve81NQP/zgh7EbDH7t3nhffEHPzSDLbHy6sP8c+7KW/aoPXomUC4ax6sKBi0rJs7B8KUMtHvgwAF7VA4cjr6UdVQHw0F+VwacqCx8NxQBWahI4BL8RhIpAUaawhSBsxMsU0HKqjFCuzInpfDDvPPzrUwazj95LrfdR/wcPREo4spzvKK5C87GcK0InMKHIWysTSDDuHlIGRgWxxzfzWNi58PJqzgJ7blhW2z4SV/8TI5TxURBv5h7054/tPcJHZP92GiEqYfrX2waUtW+IVy3O0fRFrNRiG/XmB1Cu8JMZH5J9px59RV71D7329dGiQ2PpqamsrmK79TcUKJ5OB/BwYnwUoHHB0chW+E0jlibQMb1vxuDNqQMw03Gsf1r4HuIOcxuODuOUQQ2CftEPyXxcU3uu3v27BHtzOe06aAPUnv8ljZcH2OjEb4TOrezeSjIsvaVcALtFKFdY3YA367g1kiZi/r8c+K3Hcue0HgG5YZJNxpx4sRhxuGYYZUU3cpkIIwdOgRtxobXkkNLxJyVdsNrIIhIQ1rOJQUJH+wiOTTvSzbx+y/Ni3FyX5wO2pOc3w9C4YgEuDapHwRGiiwhdYbH3YB+17WrgzVSikFzVy7dW+vsRGHIp3GBxhxbchofyXlwmDBC++AksQyLiEIhVUESVuzmguQMUDSXzssYecM47CLZJq89Cjkhvo2lIab0G2C0IJ0/737VhXOx1ONvReeJ9RvKDo8BQfIQfDtrnXk0LlDJsXHqIrHg/BJ5GShvzRKkCF8WKaLGxOlgDhZuMeE68tpk2SZGLFPl2YSAJt0H15YkUL9/iIK1ZoptCEDKuN2A/oX9Kqqq17Vr0zQuUMmxyxpEimxNOUGIFBiqRN5uE8vMBDrWH2OblHmktshaDH8p1rHswm/deidz0l7dl+VG4wKVblxKjq0Uw9wfMTLfJlOlMq9cjjQuUClbSllVSROGrrEqvA+ZOjYtUcqThEDLPHQAKQlZmquVvY4mkOzMnJuKeNXNCQ1hxq6RURDDW77P3Dp8dFKpR+MClRy7bGVPco52Cj3tUGcJgXlr1WpjXSRxML1ASFU315ZUeOEz3keYFLz4freIBYflPAJrXKAUE0JwnLxqLMSWZ7rpEHlI56WCGQMhshYaVhu7NX+LVWtjdiyC/kvBhGuIVeDrngukABMLZimNXDpN4wKNCWrv3r12bylUDKXnZGmraHmmW0gORCSPPTxBZVNCClidILZkkve8MVVZV831NwQQq8rmLX+1IxxpiE4wk0QqZfZejaw6TU+GuNLDA8xb+MNQYRYiCpN5JAcpWkPsJjimJAAESrBxj/XxylKE9AwrdkBI3UJ6egk70h/XPweCkp6PJghKwcghZUmEGXsGuCwx4XNN+Aj9p8+cRxJtr0ZWnaZxgQJGlRwTkVJo8KM335WGgdyAXlcJY08/ucIK/edVivBcvySgThILIvSHz9xfy2Mdk75IczmGsBAbMiN2Mi/zaYTDMZXedueFBAWp7wQY7E7/6bMUIHo5suo0PREozkm0rps9MH7ev4ZpCpyErQ4Enm47EfaNPXMM7mmm2DzYL/rQlpSVECLnQMgIRwpGdcnrewz6GQucn0Z6IlDgZjMcrCpSIivDxbri7jQsJ8Se95Wg31V/0w7YmYxe1V6IM3R0jsu2w/fqBi8Hfa8iUs5J4Msbkn/a6JlAAUMyPCL6Ft14sg03i2JLVWfrNvSLrSgjIkqCS7uOWxUcnfOWCQpO0FIW4n4RVPlOHu58nagR0Gf6U+ac9K2pwNcUXfmbRP39/XZvgdu3b9u9OBQXwjkF1TwcuhdzijrXwTVQvPDnYDg289FUAgv9Y/Oh6omTl7WzdJ1V26gKxSD8o8lz9hr9v1kUJWF6OsRVFCUfFaiiJIwKVFESRgWqKAmjAlWUhFGBKkrCqEAVJWFUoIqSMCpQRUkYFaiiJIwKVFESRgWqKAmjAlWUhFGBKkqyGPN/cT4WcfVrvb0AAAAASUVORK5CYII='
        />
      </defs>
    </svg>
  )
}
