import * as React from 'react';
import { Tag } from 'antd';

const CheckableTag = Tag.CheckableTag;

interface Props {
  categories: string[];
  isOpen: boolean;
  onSelectCategory: (categories: string[]) => void;
}

interface State {
  selectedTags: string[];
}

export class SetCategory extends React.Component<Props, State> {
  public state = {
    selectedTags: [],
  };

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isOpen && this.props.isOpen !== nextProps.isOpen) {
      this.setState({ selectedTags: [] });
    }
  }

  public render() {
    const { selectedTags } = this.state;
    const { categories } = this.props;
    return (
      <div>
        {categories.map((tag: string, index: number) => (
          <CheckableTag
            key={index}
            checked={(selectedTags as string[]).includes(tag)}
            onChange={(checked: boolean) => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }

  private handleChange = (tag: string, checked: boolean) => {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    this.setState({ selectedTags: nextSelectedTags });
    this.props.onSelectCategory(nextSelectedTags);
  };
}
