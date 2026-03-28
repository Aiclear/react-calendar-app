import { Box, Button, Checkbox, Flex, Grid, Heading, SegmentedControl, Text, TextField, Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { DateTime } from "luxon";

const viewTypes = ['day', 'week', 'month', 'year'] as const
const calendarSources = ['google', 'outlook', 'icloud', 'oppo', 'xiaomi'] as const
const zhWeekDays = ['一', '二', '三', '四', '五', '六', '日'] as const

function CalendarApp() {
  return (
    <Theme>
      <Flex direction={"column"} gap={"1"} height={"100vh"}>
        {/* Header */}
        <Flex
          gap={"1"}
          height={"64px"}
          align={"center"}
          style={{ boxShadow: "var(--shadow-3)" }} px={"4"}>
          {/* calendar functions */}
          <Box flexGrow={"1"}>
            <Flex gap={"1"}>
              <Button>Calendar</Button>
              <Button>+</Button>
              <Button>Print</Button>
            </Flex>
          </Box>

          {/* display views */}
          <Box flexGrow={"8"}>
            <SegmentedControl.Root defaultValue={viewTypes[0]}>
              {viewTypes.map(item => {
                return (
                  <SegmentedControl.Item key={item} value={item}>
                    {capitalizeFirstLetter(item)}
                  </SegmentedControl.Item>
                )
              })}
            </SegmentedControl.Root>
          </Box>

          {/* search */}
          <Box flexGrow={"1"}>
            <TextField.Root placeholder='Search' />
          </Box>
        </Flex>

        {/* Main */}
        <Flex flexGrow={"1"}>
          {/* sidebar */}
          <Box width={"280px"} p={"4"}>
            {calendarSources.map(source => {
              return (
                <Text as="label" size="3">
                  <Flex gap="2">
                    <Checkbox defaultChecked />
                    {source}
                  </Flex>
                </Text>
              )
            })}
          </Box>

          <Box width={"2px"} style={{ backgroundColor: "var(--gray-5)" }}></Box>

          {/* calendar view */}
          <Box>
            <SimpleCalendar />
          </Box>
        </Flex>
      </Flex>
    </Theme>
  )
}

function SimpleCalendar() {
  return (
    <Flex direction={"column"} style={{ boxShadow: "var(--shadow-3)" }} p={"3"}>
      {/* Header */}
      <Box>
        <Heading size={"3"} weight={"regular"}>{DateTime.now().toFormat("MM月dd日")}</Heading>
      </Box>

      {/* Body */}
      <Box>
        <Flex>
          <Box>{DateTime.now().toFormat("yyyy年MM月")}</Box>
          <Box>
            <Button>Down</Button>
            <Button>Up</Button>
          </Box>
        </Flex>
        <Flex gap={"7"}>
        </Flex>
        <Grid columns={"7"} rows={"7"} gap={"5"}>
          {zhWeekDays.map(weekDay => {
            return <Box key={weekDay}>{weekDay}</Box>
          })}
          {Array.from({ length: DateTime.now().daysInMonth }, (_, i) => i + 1).map(day => (
            <Box key={day}>{day}</Box>
          ))}
        </Grid>
      </Box>
    </Flex>
  )
}

/**
 * 将字符串的首字母转换为大写
 * @param str 需要写首字母的字符串
 * @returns 转换后的字符串
 */
function capitalizeFirstLetter(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default CalendarApp
