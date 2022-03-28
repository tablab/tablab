export default function NewTab() {
  return (
    <form method="post" action="/tabs/new">
      <p>
        <label>
          Title: <input name="title" type="text" />
        </label>
      </p>
      <p>
        <label>
          <textarea name="content" />
        </label>
      </p>
      <p>
        <button type="submit">Create</button>
      </p>
    </form>
  )
}
