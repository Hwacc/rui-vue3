import type { Meta, StoryObj } from '@storybook/vue3'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from '@rui/core/components/sidebar'

const meta = {
  title: 'RUI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'radio', options: ['left', 'right'] },
    layout: { control: 'radio', options: ['block', 'fixed'] },
    collapsible: { control: 'radio', options: ['none', 'icon', 'offcanvas'] },
    unstyled: { control: 'boolean' },
  },
  args: {
    side: 'left',
    layout: 'block',
    collapsible: 'offcanvas',
    unstyled: false,
  },
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: {
      SidebarProvider,
      Sidebar,
      SidebarTrigger,
      SidebarContent,
      SidebarHeader,
      SidebarFooter,
    },
    setup() {
      return () => {
        return (
          <div class="size-[640px]">
            <SidebarProvider class="size-full">
              <Sidebar {...args}>
                <SidebarHeader>App sidebar header</SidebarHeader>
                <SidebarContent>
                  App sidebar content
                  <SidebarTrigger></SidebarTrigger>
                </SidebarContent>
                <SidebarFooter>App sidebar footer</SidebarFooter>
              </Sidebar>
              <div class="flex-1">
                <SidebarTrigger></SidebarTrigger>
                App content
              </div>
            </SidebarProvider>
          </div>
        )
      }
    },
  }),
}
