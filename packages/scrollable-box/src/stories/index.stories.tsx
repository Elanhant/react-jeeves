import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css, ClassNames } from '@emotion/core';
import ScrollableBox, { ScrollableBoxProps } from '../components/ScrollableBox';
import useDefaultLipClassNames from '../hooks/useDefaultLipClassNames';
import '../stylesheets/default.css';

const overflowLipCss = css`
  height: 1px;
  border: none;
  position: relative;
  overflow: visible;
  flex-shrink: 0;

  &::after {
    // lip shadow
    content: ' ';
    position: absolute;
    height: 4px;
    left: 0;
    right: 0;
    opacity: 0;
    transition: opacity 0.2s ease-in;
  }
`;

const overflowShadowVisibleCss = css`
  &::after {
    opacity: 1;
  }
`;

const overflowLipTopCss = css`
  ${overflowLipCss};
  &::after {
    border-bottom: 1px solid #e6e6e6;
    box-shadow: 0 4px 4px 0 rgba(33, 34, 38, 0.05);
    bottom: 0;
  }
`;

const overflowLipBottomCss = css`
  ${overflowLipCss};
  &::after {
    border-top: 1px solid #e6e6e6;
    box-shadow: 0 -4px 4px 0 rgba(33, 34, 38, 0.05);
    top: 0;
  }
`;

const overflowLipTopVisibleCss = css`
  ${overflowLipTopCss};
  ${overflowShadowVisibleCss};
`;
const overflowLipBottomVisibleCss = css`
  ${overflowLipBottomCss};
  ${overflowShadowVisibleCss};
`;

const longText = (
  <React.Fragment>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae nihil
    consequuntur, modi dolores voluptate magni tempora fugiat. Adipisci sunt
    molestias optio, beatae asperiores quas iusto dolor nihil illum? Quas,
    blanditiis! Qui nostrum repellat mollitia id impedit fugit, cupiditate quos
    laborum cum? Ipsum deleniti quisquam ea? Eius dolorum consequatur veniam
    nesciunt earum sit praesentium, sapiente quis nam eos odit alias amet. Rem,
    labore. Iure, provident quae? Ipsa, quos! Blanditiis voluptates voluptas
    assumenda dolores consequuntur voluptate! Laboriosam doloremque doloribus
    corporis quam ab dolorum in laborum obcaecati esse maiores. Perferendis
    inventore fugit earum! Ex quibusdam reiciendis soluta commodi minus, vitae
    voluptates minima doloribus molestias delectus adipisci aliquid ipsum
    expedita sequi eum illo, quam neque necessitatibus voluptatem! Numquam
    quasi, corrupti assumenda cum vel nobis? Quos sit, aliquid suscipit neque,
    quaerat id doloremque fuga sunt soluta maiores veniam impedit. Atque optio
    voluptatum, ullam provident distinctio illo est facere cupiditate molestiae
    fugit, cum, dolore a nobis! Fugit voluptate reiciendis deleniti similique
    aliquid. Pariatur nulla harum non dolores accusantium sequi est quo, nisi
    quae corporis, illo, voluptatibus similique nobis quas odit dicta?
    Voluptatum ut iusto temporibus itaque. Possimus, provident quia repudiandae
    saepe at, consequatur asperiores laborum officia culpa, cum dignissimos
    minima laudantium nostrum recusandae pariatur reiciendis! Alias blanditiis
    eligendi facere accusantium consequuntur aperiam illo officiis nam
    assumenda. Molestiae adipisci maxime nemo dolor placeat voluptates
    laboriosam suscipit eum, fugit nam exercitationem sapiente dolorem,
    quibusdam autem alias impedit tenetur iusto incidunt architecto omnis quae
    odio. Incidunt a quae ratione. Velit dolorum modi nobis? Repudiandae, dolore
    ipsam voluptas molestias repellendus fuga excepturi quia odio nisi illum
    consectetur amet quo reiciendis, porro delectus inventore eveniet ducimus
    accusantium eum culpa eos. Non? Praesentium, accusamus soluta. Quae tempore
    cupiditate error nobis aspernatur nesciunt blanditiis, autem, facilis
    sapiente labore vitae, officia odio aut veniam ipsam eligendi! Aliquam
    libero earum maxime quaerat nesciunt quod suscipit. Culpa sunt voluptatem
    atque in ea quasi eaque repellendus, impedit deserunt voluptatum corporis
    cum amet blanditiis eveniet eius optio ipsam qui. Ducimus suscipit repellat
    magnam ut harum hic. Repudiandae, explicabo! Natus distinctio commodi
    nesciunt eaque voluptate animi vitae minus harum magni in quos minima atque
    esse, dolores recusandae neque pariatur labore. Atque tenetur maiores
    praesentium sunt omnis accusamus et dolor? Deleniti fugiat enim eos qui
    nostrum quae fugit sapiente quis itaque ex ullam officiis, aperiam corrupti
    blanditiis error veritatis, beatae consequuntur. Deleniti quas accusantium
    commodi assumenda voluptatem culpa dolore repudiandae! Suscipit iste quod
    similique error sed nobis ducimus, nam perferendis explicabo adipisci quia
    officiis ratione omnis. Hic ad fuga eum, quas accusamus debitis nostrum
    sequi rem. Culpa corrupti suscipit omnis. Libero incidunt est minus,
    excepturi velit odit accusantium. Molestias distinctio iste placeat eaque
    magni minus beatae dolore aperiam vero natus, at est veritatis sequi ab id,
    voluptate quidem! Magni, fugiat. Corrupti aliquam doloremque dolore,
    suscipit error blanditiis autem quibusdam consequatur maxime possimus iusto
    omnis deleniti sint veniam quos accusamus cumque est facere explicabo quia
    labore? Vero, sapiente. Sunt, suscipit sit. Possimus quo sint magnam quis,
    nulla et animi eaque voluptatum veniam aperiam in, totam suscipit minima
    accusantium? Laudantium labore pariatur ipsa exercitationem incidunt fugiat
    voluptatum voluptas cum est, quae explicabo! Nisi consequuntur quidem illum
    architecto dignissimos, aut facere labore rerum expedita laborum praesentium
    at adipisci ipsum nesciunt. Provident accusamus laboriosam maxime eveniet
    accusantium. Vero quasi quo veritatis facere, iste debitis. Sunt corrupti
    eveniet mollitia quis voluptates minima alias quibusdam architecto sequi.
    Perferendis neque cum, eos iste nobis ad atque soluta ex officia eligendi
    dicta eum facilis error ea temporibus doloribus. Exercitationem inventore
    expedita laudantium qui reiciendis fugit eius mollitia deleniti perspiciatis
    vel. A officia mollitia fuga, veniam, quas blanditiis aut obcaecati fugit
    earum impedit qui provident rerum ipsa sit? Soluta.
  </React.Fragment>
);

storiesOf('scrollable-box', module)
  .add('emotion', () => {
    return (
      <React.Fragment>
        <ClassNames>
          {({ css }) => {
            const visibleTopCss = css(overflowLipTopVisibleCss);
            const hiddenTopCss = css(overflowLipTopCss);
            const visibleBottomCss = css(overflowLipBottomVisibleCss);
            const hiddenBottomCss = css(overflowLipBottomCss);

            return (
              <ScrollableBox
                className={css({ maxHeight: '240px', overflow: 'auto' })}
                topLipClassName={(visible) =>
                  visible ? visibleTopCss : hiddenTopCss
                }
                bottomLipClassName={(visible) =>
                  visible ? visibleBottomCss : hiddenBottomCss
                }
              >
                {longText}
              </ScrollableBox>
            );
          }}
        </ClassNames>
      </React.Fragment>
    );
  })
  .add('useDefaultLipClassNames', () => {
    function ScrollableBoxCSS(
      props: Pick<
        ScrollableBoxProps,
        Exclude<
          keyof ScrollableBoxProps,
          'topLipClassName' | 'bottomLipClassName'
        >
      >,
    ) {
      const lipClassNames = useDefaultLipClassNames();
      return <ScrollableBox {...props} {...lipClassNames} />;
    }
    return (
      <React.Fragment>
        <ScrollableBoxCSS style={{ maxHeight: '240px', overflow: 'auto' }}>
          {longText}
        </ScrollableBoxCSS>
      </React.Fragment>
    );
  });
