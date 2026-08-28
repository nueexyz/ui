import { Button } from "@cachette/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@cachette/ui/dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { StoryPage, StoryPreview } from "./story-layout/StoryLayout";

const meta = {
  title: "Components",
  parameters: { layout: "fullscreen" },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownMenuStory: Story = {
  name: "Dropdown Menu",
  render: () => (
    <StoryPage
      title="Dropdown Menu"
      description="현재 대상에 적용할 수 있는 행동과 설정을 버튼에서 엽니다."
    >
      <StoryPreview>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="secondary">메뉴 열기</Button>} />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>프로젝트</DropdownMenuLabel>
              <DropdownMenuItem>
                이름 바꾸기<DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                복제하기<DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem defaultChecked>즐겨찾기에 표시</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>삭제하기</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </StoryPreview>
    </StoryPage>
  ),
};
