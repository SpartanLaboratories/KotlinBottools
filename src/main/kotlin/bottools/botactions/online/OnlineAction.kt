package bottools.botactions.online

import bottools.botactions.*
import net.dv8tion.jda.api.entities.channel.Channel
import net.dv8tion.jda.api.entities.channel.middleman.MessageChannel
import net.dv8tion.jda.api.utils.messages.MessageCreateData
import org.json.JSONObject
import org.json.JSONTokener
import java.io.File
import java.io.IOException
import java.io.Reader
import java.io.StringReader

/**
 * An extension of the BotAction class adding functionality that has
 * to do with accessing online content. Wrapper class for Connector.
 * @see Connector
 *
 * @author Spartak
 */
private val connector = Connector()

/**
 * Sends an image found online at the designated URL to the passed in Text channel
 * @param channel the Text channel that the image is to be sent to
 * @param imageAddress the URL of the image that is to be sent
 */
fun sendImageInChannel(imageAddress: String, channel: MessageChannel) =
    sendFileInChannel(channel, connector saveImage imageAddress to "res/temp.png")

/**
 * Returns the next line of the source HTML code from the URL you are currently
 * connected to
 * @return the next line of HTML source code
 * @throws IOException
 */
@get:Throws(IOException::class)
val nextLine: String
    get() = connector.next()

/**
 * Establishes a connection with the specified URL. Return whether the
 * established connection was successful or not.
 * @param URL the URL address that you want to connect to.
 * @return **true** is the connection was established successfully <br></br>
 * **false** if it was not
 */
fun connect(URL: String?): Boolean = connector.open(URL!!)

/**
 * Return the results of a get request sent to the specified URL
 * @param URL to send a get request to
 * @return what is returned by the get request
 */
fun get(URL: String): JSONObject {
    val reader: Reader = StringReader(connector.get(URL))
    return JSONObject(JSONTokener(reader))
}

/**
 * Closes the connection to the currently opened URL.
 * Must be done before opening another one.
 */
fun closeConnection() = connector.close()

/**
 * Takes the image at the given URL and saves it to a file with the given file name.
 * File does not need to already exist. If it does not exist, then one will be created.
 * @param url where the image is located
 * @param fileName the name of the file to which you want to save the image.
 * @return
 */
fun saveImage(url: String, fileName: String): File = connector.saveImage(url, fileName)

/**
 * Allows for easier browsing of html data by skipping the line
 * that starts with the given search term.
 * @param lineStartSearchTerm the beggining of the line that you are searching for
 * @return    The line that was found
 * @throws IOException if the line was not found
 */
@Throws(IOException::class)
fun skipLinesTo(lineStartSearchTerm: String?): String {
    var data: String
    do {
        data = nextLine
    } while (!(data.startsWith(lineStartSearchTerm!!) || data.trim { it <= ' ' }.startsWith(lineStartSearchTerm)))
    return data
}
