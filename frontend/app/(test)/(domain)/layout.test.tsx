import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RootLayout from "@/app/(src)/(domain)/layout";

it("test_render_with_children",() => {
    const children = <div>Test</div>;
    const { getByText } = render(<RootLayout>{children}</RootLayout>);
    expect(getByText('Test')).toBeInTheDocument();
})

it('test_set_className_attribute', () => {
    const children = <div>Test</div>;
    const { container } = render(<RootLayout>{children}</RootLayout>);
    const body = container.querySelector('body');
    expect(body).toHaveClass('className');
})

it('test_children_is_not_a_react_node', () => {
    const wrapper = render(<RootLayout children={null} />);
    expect(wrapper.container.querySelector('body')!.children.length).toBe(0);
})