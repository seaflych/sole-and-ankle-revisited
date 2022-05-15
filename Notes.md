Notes:

1.  use `rem` for query values

    (`x` / 16) rem

2.  for desktop first, use only `max-width` query, and for mobile first, use `min-width`
3.  the order of the query is important

    for desktop query, we need to place the bigger one first, because the biggest one `max-width` matches for all the other viewports (laptop, tablet, phone)

    ```css
    @media ${QUERIES.laptopAndSmaller}{}

    @media ${QUERIES.tabletAndSmaller}{}

    @media ${QUERIES.phoneAndSmaller}{}
    ```

4.  ‘react-feather’ for icons? are they links or buttons in table and smaller screen?

    link —> takes you to a new page

    button —> a drop down or something similar

    because they are all actions, we want to use `button` to wrap all icons, we could simply add a `onClick` handler on icons, but we **want people who navigate with keyboard can select it and then press enter to trigger it**.

5.  subtle details, the space between shopping-bag icon and search icon is slightly less than the space between search icon and menu icon.

    to fix it we can use `transform` , which shift something around without affecting its other children. (similar to use `top` when it comes to relative positioned elements )

    ```jsx
    const ShoppingBagButton = styled(UnstyledButton)`
      transform: translateX(-2px);
    `;
    ```

6.  As a React app, we can easily reuse a component in different viewport

    in this exercise, in the sidebar, we keep the breadcrumb, but remove the category links. We could only have the same breadcrumb component in all the viewport, tweak the positions. But it’s way more easily we create another instance in mobile, and hide the one in desktop.

7.  hide `Select` component in mobile viewport

    ⚠️
    **IMPORTANT!**

    **DON’T** add `@media` query directly to the component, because it may be reusable in other place, the media query rule should **only apply to the container where we use the component**.

8.  Styled Component, how to wrapper a component

    in this exercise, we can’t use `styled(Select)`

    ```jsx
    const SortFilterWrapper = styled(Select)`
      @media ${QUERIES.phoneAndSmaller} {
        display: none;
      }
    `;
    ```

    in `Select` component, the props are not delegated to the `Wrapper` , so if we use `styled(Select)` , the props we pass to `Select` , are delegated to the `NativeSelect` , so the `display:none;` is not applied to the `Wrapper`

    ```jsx
    return (
      <Wrapper>
        <VisibleLabel>{label}</VisibleLabel>

        <SelectWrapper>
          <NativeSelect {...delegated}>{children}</NativeSelect>

          <DisplayedBit>
            {displayedValue}
            <ChevronIcon id="chevron-down" size={24} strokeWidth={1.5} />
          </DisplayedBit>
        </SelectWrapper>
      </Wrapper>
    );
    ```

9.  Easily missed details

    the `Main` component has less padding top in Tablet and Mobile view.

    it’s difficult notice it by eyes, we can screenshot the final result, compare it with Figma design, to make sure everything is correct.

10. use the `@reach/dialog` package to make sure that the modal is accessible.

    use `import { DialogOverlay, DialogContent } from "@reach/dialog";` low level component to have more control over the styles.

    overlay style

    ```css
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: hsl(220deg 5% 40% / 0.8);
    }
    ```

    use `fixed` the height will be the viewport height, use absolute, it will be the height of `html` (if no relative parent found)

    if `body,html{height:100%}` set, the hight will be the viewport, if not the height will grow with the content.

    Skip including styles

    ```css
    :root {
      --reach-dialog: 1;
    }
    ```

11. we can use the same trick for setting the mobile nav in center

    ```jsx
    <Content>
      <CloseButton />
      <Filler />
      <MobileNav />
      <Footer />
    </Content>
    ```

    `Filler` and `Footer` `flex:1;` and use position absolute on `CloseButton` to place it in the right place

12. give `CloseButton` padding to make it easier to tap and position it in the same place as the Menu icon
13. Notice this issue in practice

    our desktop navigation disappears *just* before it runs out of space:

    ![https://file+.vscode-resource.vscode-cdn.net/Users/hzh/Desktop/study/css-for-js/sole-and-ankle-revisited/docs/nav-barely-fits.gif](https://file+.vscode-resource.vscode-cdn.net/Users/hzh/Desktop/study/css-for-js/sole-and-ankle-revisited/docs/nav-barely-fits.gif)

    What happens, though, if our Marketing friends rename the categories? Or, what happens when we internationalize the project, and the category names are rendered in a longer language?

    ![https://file+.vscode-resource.vscode-cdn.net/Users/hzh/Desktop/study/css-for-js/sole-and-ankle-revisited/docs/french-nav-overflow.gif](https://file+.vscode-resource.vscode-cdn.net/Users/hzh/Desktop/study/css-for-js/sole-and-ankle-revisited/docs/french-nav-overflow.gif)

    We can do two things to make this better:

    1. Manage the overflow in the header to scroll this section when it doesn't fit.
    2. Use fluid gaps between the nav links, to reduce the likelihood that this'll be required.

    Pick the min size, max size for the gap.

    fluid font size:

        x (vw)= maxSize -minSize / (maxView/100-minView/100)

    relative mixin:

        y= x * minView/100 - minSize
