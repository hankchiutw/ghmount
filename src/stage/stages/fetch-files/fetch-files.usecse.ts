import { FileNode, FileNodeMode } from '@app/entities';
import { Api } from '@app/shared/api';
import { injectable, inject } from 'inversify';

interface FileNodeRaw {
  path: string;
  type: string;
  size?: number;
  url?: string;
  mode: string;
  sha: string;
}

@injectable()
export class FetchFilesUsecase {
  // @ts-ignore
  constructor(@inject(Api) private api: Api) {}

  async fetchRepo(): Promise<FileNode[]> {
    const nodes = tree.map(toFileNode);

    return Promise.resolve(nodes);
  }
}

function toFileNode(raw: FileNodeRaw): FileNode {
  const { path, type, size, url } = raw;
  return {
    path: `/${path}`,
    children: [],
    stat: {
      size: size || 0,
      mode: type === 'blob' ? FileNodeMode.FILE : FileNodeMode.DIR,
    },
    url: url || '',
  };
}

const tree: FileNodeRaw[] = [
  {
    path: '.colordiffrc',
    mode: '100644',
    type: 'blob',
    sha: '47cd50b0f6e3921f00ba88e6007665faf5bb1b8a',
    size: 847,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/47cd50b0f6e3921f00ba88e6007665faf5bb1b8a',
  },
  {
    path: '.eslintrc.babel.js',
    mode: '100644',
    type: 'blob',
    sha: '7be41776b4d240079fe0822122b4de1379019ccb',
    size: 1238,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/7be41776b4d240079fe0822122b4de1379019ccb',
  },
  {
    path: '.eslintrc.js',
    mode: '100644',
    type: 'blob',
    sha: '6cef11f04505c49e0300d230ef22b0310507ae99',
    size: 1156,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/6cef11f04505c49e0300d230ef22b0310507ae99',
  },
  {
    path: '.gitconfig',
    mode: '100644',
    type: 'blob',
    sha: '137781c60b389bed29f109ce7977e6bf03b97d9d',
    size: 1899,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/137781c60b389bed29f109ce7977e6bf03b97d9d',
  },
  {
    path: '.gitignore',
    mode: '100644',
    type: 'blob',
    sha: 'bb264cd3bf97c956466fc498190b733e481705e6',
    size: 11,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/bb264cd3bf97c956466fc498190b733e481705e6',
  },
  {
    path: '.gitmodules',
    mode: '100644',
    type: 'blob',
    sha: 'a829ccbec0442e85091b313d00dedb273b2976ce',
    size: 92,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/a829ccbec0442e85091b313d00dedb273b2976ce',
  },
  {
    path: '.hyper.js',
    mode: '100644',
    type: 'blob',
    sha: '3e9ac42dacb880f8d28ecfc5d77de17622db5663',
    size: 5333,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/3e9ac42dacb880f8d28ecfc5d77de17622db5663',
  },
  {
    path: '.prettierrc.js',
    mode: '100644',
    type: 'blob',
    sha: '38c9a91cc9d57300220c75ce60680a24069667e6',
    size: 110,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/38c9a91cc9d57300220c75ce60680a24069667e6',
  },
  {
    path: '.stylelintrc',
    mode: '100644',
    type: 'blob',
    sha: '84e8bb2564c4c820dd7d687e9d319b3c108fae70',
    size: 1272,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/84e8bb2564c4c820dd7d687e9d319b3c108fae70',
  },
  {
    path: '.tern-config',
    mode: '100644',
    type: 'blob',
    sha: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
    size: 0,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
  },
  {
    path: '.tigrc',
    mode: '100644',
    type: 'blob',
    sha: '17b38aa5887b1bc150889073a39a79c400537b47',
    size: 683,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/17b38aa5887b1bc150889073a39a79c400537b47',
  },
  {
    path: '.tmux.conf',
    mode: '100644',
    type: 'blob',
    sha: '9d15bdf37e0f5dcff11a728d33239d5fa997f0f5',
    size: 2979,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/9d15bdf37e0f5dcff11a728d33239d5fa997f0f5',
  },
  {
    path: 'README.md',
    mode: '100644',
    type: 'blob',
    sha: '8194f1e9f2593efdd133f3b603e50ca56d6f9dcf',
    size: 4219,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/8194f1e9f2593efdd133f3b603e50ca56d6f9dcf',
  },
  {
    path: 'alacritty.yml',
    mode: '100644',
    type: 'blob',
    sha: '47774ae12a452c3b0720e15e9f8b12c03cda763a',
    size: 21004,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/47774ae12a452c3b0720e15e9f8b12c03cda763a',
  },
  {
    path: 'bashrc',
    mode: '100644',
    type: 'blob',
    sha: 'c7d180e272b3be51575e45dc3d32795255349cc3',
    size: 1700,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/c7d180e272b3be51575e45dc3d32795255349cc3',
  },
  {
    path: 'coc-settings.json',
    mode: '100644',
    type: 'blob',
    sha: '69162064a8db8d999029ca4aa7b186e2cb52569f',
    size: 437,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/69162064a8db8d999029ca4aa7b186e2cb52569f',
  },
  {
    path: 'config.fish',
    mode: '100644',
    type: 'blob',
    sha: 'fce246615db8397772e449f66819cc42de338b0b',
    size: 2564,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/fce246615db8397772e449f66819cc42de338b0b',
  },
  {
    path: 'default.ctags',
    mode: '100644',
    type: 'blob',
    sha: 'e48358550853dbdf2a62068744534c004ddc9786',
    size: 81,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/e48358550853dbdf2a62068744534c004ddc9786',
  },
  {
    path: 'dotvim',
    mode: '040000',
    type: 'tree',
    sha: '947a745d35350404faf8f0fc52fcb6c68525358d',
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/trees/947a745d35350404faf8f0fc52fcb6c68525358d',
  },
  {
    path: 'dotvim/ale-quickfix.vim',
    mode: '100644',
    type: 'blob',
    sha: '52f1f51db7108d6eaa782ad6eeb41880b45d2283',
    size: 2270,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/52f1f51db7108d6eaa782ad6eeb41880b45d2283',
  },
  {
    path: 'init.vim',
    mode: '100644',
    type: 'blob',
    sha: '578ce3e606691e9c69a2814ea5f1686b48061ee4',
    size: 3531,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/578ce3e606691e9c69a2814ea5f1686b48061ee4',
  },
  {
    path: 'install.sh',
    mode: '100755',
    type: 'blob',
    sha: '7064519b52a9ae3cdcec7f6faaa575f5d2f8eeed',
    size: 3295,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/7064519b52a9ae3cdcec7f6faaa575f5d2f8eeed',
  },
  {
    path: 'install_nvim.sh',
    mode: '100755',
    type: 'blob',
    sha: 'b8aab5dce23dd874aa819ff8c4ff4bfb4621e407',
    size: 266,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/b8aab5dce23dd874aa819ff8c4ff4bfb4621e407',
  },
  {
    path: 'kitty.conf',
    mode: '100644',
    type: 'blob',
    sha: 'f87d526f923c58afd7629f1bc08ddacfbe21ba72',
    size: 46392,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/f87d526f923c58afd7629f1bc08ddacfbe21ba72',
  },
  {
    path: 'mysnippets',
    mode: '040000',
    type: 'tree',
    sha: '2eb8188521f4fce5075a35bf22e9d84c03dc92dd',
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/trees/2eb8188521f4fce5075a35bf22e9d84c03dc92dd',
  },
  {
    path: 'mysnippets/javascript.snippets',
    mode: '100644',
    type: 'blob',
    sha: 'c78f43928bae7f05b7d9c396ff9897d07bff01f9',
    size: 606,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/c78f43928bae7f05b7d9c396ff9897d07bff01f9',
  },
  {
    path: 'plugin',
    mode: '040000',
    type: 'tree',
    sha: 'b316b39198f18b588eb47af50f2889c5855d5c1b',
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/trees/b316b39198f18b588eb47af50f2889c5855d5c1b',
  },
  {
    path: 'plugin/_basic.vim',
    mode: '100644',
    type: 'blob',
    sha: 'b795da5899b67e085711a32e9de6a7b3f86eeb7f',
    size: 1415,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/b795da5899b67e085711a32e9de6a7b3f86eeb7f',
  },
  {
    path: 'plugin/_color.vim',
    mode: '100644',
    type: 'blob',
    sha: '455274e88e1a4317f53c7a294b836d273dc6b2e4',
    size: 906,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/455274e88e1a4317f53c7a294b836d273dc6b2e4',
  },
  {
    path: 'plugin/_map.vim',
    mode: '100644',
    type: 'blob',
    sha: '8c9c47712ea0de9309a3524d09dc273d0c9d4ca6',
    size: 1579,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/8c9c47712ea0de9309a3524d09dc273d0c9d4ca6',
  },
  {
    path: 'plugin/ale.vim',
    mode: '100644',
    type: 'blob',
    sha: '772f9151f2660b7ab37ead225e4cf10c26d26938',
    size: 2057,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/772f9151f2660b7ab37ead225e4cf10c26d26938',
  },
  {
    path: 'plugin/coc.vim',
    mode: '100644',
    type: 'blob',
    sha: '10959d544f21036d63bddfd5ce9962c7228de07e',
    size: 858,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/10959d544f21036d63bddfd5ce9962c7228de07e',
  },
  {
    path: 'plugin/ctrlsf.vim',
    mode: '100644',
    type: 'blob',
    sha: '92f8be6940786b24e5396ad5df6b0846bfb106a5',
    size: 793,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/92f8be6940786b24e5396ad5df6b0846bfb106a5',
  },
  {
    path: 'plugin/defx.vim',
    mode: '100644',
    type: 'blob',
    sha: '6559f2ecb8a9c4384e7dd14c8e36143b62b51294',
    size: 3874,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/6559f2ecb8a9c4384e7dd14c8e36143b62b51294',
  },
  {
    path: 'plugin/fzf.vim',
    mode: '100644',
    type: 'blob',
    sha: '27f6d33bfd6b72c2163b14537796049efb252ebe',
    size: 768,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/27f6d33bfd6b72c2163b14537796049efb252ebe',
  },
  {
    path: 'plugin/tagbar.vim',
    mode: '100644',
    type: 'blob',
    sha: '339afbc2009697cfbcf55e8ffd0c471bf89b9698',
    size: 1606,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/339afbc2009697cfbcf55e8ffd0c471bf89b9698',
  },
  {
    path: 'plugin/vim-airline.vim',
    mode: '100644',
    type: 'blob',
    sha: 'e17b6d123c39e34a13ac066b3dfdf9506f76a324',
    size: 1639,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/e17b6d123c39e34a13ac066b3dfdf9506f76a324',
  },
  {
    path: 'plugin/vim-gitgutter.vim',
    mode: '100644',
    type: 'blob',
    sha: 'e54e3abc0c5141e9a96f9d7d2b7afb99f94d0a64',
    size: 994,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/e54e3abc0c5141e9a96f9d7d2b7afb99f94d0a64',
  },
  {
    path: 'plugin/vim-surround.vim',
    mode: '100644',
    type: 'blob',
    sha: '38ea94770e473bbab6623b79c107d56537944f01',
    size: 429,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/38ea94770e473bbab6623b79c107d56537944f01',
  },
  {
    path: 'screenshot.png',
    mode: '100644',
    type: 'blob',
    sha: 'cb0d39b33576879230374a4ec833179cab020d35',
    size: 649131,
    url:
      'https://api.github.com/repos/hankchiutw/vim/git/blobs/cb0d39b33576879230374a4ec833179cab020d35',
  },
  {
    path: 'showlinenum',
    mode: '160000',
    type: 'commit',
    sha: '29a0c8aeaaf9bc884693a467f8295ea9c66fc0e6',
  },
];
