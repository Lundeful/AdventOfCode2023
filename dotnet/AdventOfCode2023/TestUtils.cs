using Xunit.Abstractions;

namespace AdventOfCode2023;

public static class TestUtils
{
    private const string TestInputFileName = "testInput.txt";
    private const string TestOutputFileName = "testSolution.txt";
    private const string RealInputFileName = "input.txt";
    private const string OutputFileName = "output.txt";

    private static string GetFilePath(string directory, string file) => Path.Combine(directory, file);

    private static string ReadFile(string filePath)
    {
        if (!File.Exists(filePath))
        {
            throw new ApplicationException($"Missing file: {filePath}");
        }

        return File.ReadAllText(filePath);
    }

    public static void RunAndVerify(Func<string, string> solver, string currentDirectory)
    {
        var input = ReadFile(GetFilePath(currentDirectory, TestInputFileName));
        var expectedOutput = ReadFile(GetFilePath(currentDirectory, TestOutputFileName));

        var actualOutput = solver(input);
        actualOutput.Should().Be(expectedOutput);
    }

    public static void RunAndRecord(Func<string, string> solver, string currentDirectory, ITestOutputHelper testOutputHelper)
    {
        var input = ReadFile(GetFilePath(currentDirectory, RealInputFileName));
        var actualOutput = solver(input);
        RecordOutputIfNeeded(actualOutput, GetFilePath(currentDirectory, OutputFileName), testOutputHelper);
    }

    private static void RecordOutputIfNeeded(string output, string outputFilePath, ITestOutputHelper testOutputHelper)
    {
        var previousSolutions = File.Exists(outputFilePath)
            ? File.ReadAllLines(outputFilePath)
            : Array.Empty<string>();

        if (previousSolutions.Contains(output))
        {
            testOutputHelper.WriteLine("Result already recorded.");
            return;
        }

        File.AppendAllText(outputFilePath, output + Environment.NewLine);
        testOutputHelper.WriteLine($"New result, storing to file: '{output}'");
    }
}