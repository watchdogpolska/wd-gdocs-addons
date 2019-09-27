# Website Deploy Action

Deploy content to HyperOne Website authorizing using Website password and HyperOne Service Account.

## Usage

### Example Workflow file

An example workflow to authenticate with GitHub Platform:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
...
    - run: |
        ...
    - uses: ./.github/actions/hyperone-website-action
      with:
        token: "${{ secrets.HYPERONE_ACCESS_TOKEN_SECRET }}"
        website_id: "5d8d3f2393f2cc1f9a4015f3"
        website_password: "${{ secrets.WEBSITE_PASSWORD }}"
        destination: "./app/"
        source: "./app/"
```

## License

The Dockerfile and associated scripts and documentation in this project are released under the [MIT License](LICENSE).
